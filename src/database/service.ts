import mongoose from 'mongoose'
// @zakhaev26, this is unacceptable behaviour, you don't touch my configs, I will have to culture you

const connectionURI = `mongodb+srv://agro-app:8bNMsOE0YNcjLunq@cluster0.ycapx7s.mongodb.net/agrosafe?retryWrites=true&w=majority`
export var db: mongoose.Connection;

async function connectToDB() {
    try {
        await mongoose.connect(connectionURI);
        console.log("Connection Successful")

    } catch (e: any) {
        console.log(e.message)
    }
}

export default connectToDB
