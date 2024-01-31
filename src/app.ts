// Imports
import express, { Application } from 'express'
import dotenv from 'dotenv'
import { appConfig } from './helpers/config'
import connectToDB from './database/service'
import bodyParser from 'body-parser'
import registrationRoute from "./routes/registration.route"
import loginRouter from './routes/login.route'
// Configurations 
dotenv.config()
connectToDB()
const app : Application = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));

// Routes
app.use("/registration",registrationRoute)
app.use("/login",loginRouter)
const HOST = appConfig.hostProd 
const PORT = parseInt(appConfig.portProd , 10)

app.get('/healthz', (_, res) => {
    res.json({
        "alive" : true
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server live at http://${HOST}:${PORT}`)
})