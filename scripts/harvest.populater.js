const http = require('http');

const authToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YmM4MjA5NzE4MTQzODA0YTMzMTU0MiIsIm5hbWUiOiJtYWpvciIsIm1haWwiOiJidWNrQHN1Y2suY29tIiwicGFzc3dvcmQiOiJiZWF1dGlmdWxtaXN0YWtlcyIsInJvbGUiOiJBRE1JTiIsImNyZWF0ZWRBdCI6IjIwMjQtMDItMDJUMDU6NDc6NTMuMjQwWiIsIl9fdiI6MH0sImlhdCI6MTcwNjk0MzY1MywiZXhwIjoxNzA3MDMwMDUzfQ.g0rDWCgEzhhDMtYj7eofOSgTc35dBOjOJqMAZFBSWhI"
const numberOfHarvests= 2;

let crops;
const unit= ["kg", "nos.","grams", "units"]

const cropsURI = `http://127.0.0.1:3000/crop`
const cropOptions = {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json', 
    },
}

const harvestURI= `http://127.0.0.1:3000/harvest`
const harvestOptions = {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json', 
    },
}

function fetch(apiUrl, options) {
    return new Promise((resolve, reject) => {

        const req = http.request(apiUrl, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log('Data received');
                resolve(data);
            });
        });

        req.on('error', (error) => {
            reject(error)
        });

        req.end();
    })
}

function randomNumber(low, high){
    const number= Math.floor(Math.random() * (high - low + 1)) + low;
    return number;
}

async function createNewHarvest(){
    const newHarvest= {
        "quantity" : {
            "amount": randomNumber(20,200),
            "unit" : unit[randomNumber(0,3)]
        },
        "crop": crops[randomNumber(0, crops.length - 1)],
        "rate": randomNumber(20,1000)
    }
    harvestOptions.body = newHarvest;
    console.log(harvestOptions)
    const res= JSON.parse(await fetch(harvestURI, harvestOptions));
    console.log(res)
}

(async function main() {
    try {
        crops = JSON.parse(await fetch(cropsURI, cropOptions));
        for (i=0; i<numberOfHarvests -1; i++){
            createNewHarvest();
        }
    } catch (e) {
        console.log(e)
    }
})()