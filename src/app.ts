// Imports
import express, { Application } from 'express'
import dotenv from 'dotenv'
// import { appConfig } from './helpers/config'
import connectToDB from './database/service'
import bodyParser from 'body-parser'
import registrationRoute from "./routes/registration.route"
import loginRouter from './routes/login.route'
import CropRouter from './routes/crop.route'
import farmRouter from './routes/farm.route'

// Configurations 
dotenv.config()
const app : Application = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

// const HOST = appConfig.hostProd 
const PORT = 3000
// Fuck you @majorbruteforce,from zakhaev26 (from punit's laptop)

connectToDB()

// Routes

//Auth Routes [NO_JWT_MIDDLEWARE]
app.use("/registration",registrationRoute)
app.use("/login",loginRouter)

app.use("/crop", CropRouter)
app.use("/farm",farmRouter)


app.get('/healthz' ,(_, res) => {
    res.json({
        "health":"Server Healthy.",
        "isPunitGay?":true,
    })
})

app.listen(PORT, () => {
    console.log(`Server live at http://uhh...:${PORT}`)
})
