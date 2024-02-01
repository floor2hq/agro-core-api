// Imports
import express, { Application } from 'express'
import dotenv from 'dotenv'
import { appConfig } from './helpers/config'
import connectToDB from './database/service'
import bodyParser from 'body-parser'
import registrationRoute from "./routes/registration.route"
import loginRouter from './routes/login.route'
import CropRouter from './routes/crop.route'
import authenticateToken from './helpers/authenticateToken'
import farmRouter from './routes/farm.route'

// Configurations 
dotenv.config()
const app : Application = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

const HOST = appConfig.hostProd 
const PORT = parseInt(appConfig.portProd , 10)

connectToDB()

// Routes


app.use("/registration",registrationRoute)
app.use("/login",loginRouter)
app.use("/crop", CropRouter)
app.use("/farm",farmRouter)
app.get('/ruok', authenticateToken ,(req, res) => {
    res.json({
        "imok" : true,
        // @ts-ignore
        user:req['user']
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server live at http://${HOST}:${PORT}`)
})