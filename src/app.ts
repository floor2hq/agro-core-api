// Imports
import express, { Application } from 'express'
import dotenv from 'dotenv'
import { appConfig } from './helpers/config'
import connectToDB from './database/service'
import bodyParser from 'body-parser'
import registrationRoute from "./routes/registration.route"
import loginRouter from './routes/login.route'
import createCropRouter from './routes/crop/createCrop.router'

// Configurations 
dotenv.config()
const app : Application = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

const HOST = appConfig.hostProd 
const PORT = parseInt(appConfig.portProd , 10)

connectToDB()

// Routes

/* Authentication */
app.use("/registration",registrationRoute)
app.use("/login",loginRouter)

/* Crop CRUD */
app.use("/crop", createCropRouter)

app.get('/ruok', (_, res) => {
    res.json({
        "imok" : true
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server live at http://${HOST}:${PORT}`)
})