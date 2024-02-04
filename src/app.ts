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
import HarvestRouter from './routes/harvest.route'
import distributorRouter from "./routes/distributor.route"
import StorageRouter from './routes/storage.route'
import LotRouter from './routes/lot.route'
// Configurations 
dotenv.config()
const app: Application = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// const HOST = appConfig.hostProd 
const PORT = 3000
// @zakhaev26 this will end in blood and dust

connectToDB()

// Routes

//Auth Routes [NO_JWT_MIDDLEWARE]
app.use("/registration", registrationRoute)
app.use("/login", loginRouter)

app.use("/crop", CropRouter)
app.use("/farm", farmRouter)
app.use("/harvest", HarvestRouter)
app.use("/storage", StorageRouter)
app.use("/lot", LotRouter)
app.use("/distributor",distributorRouter)

app.get('/healthz', (_, res) => {
    res.json({
        "health": "Server Healthy.",
        "isPunitGay?": true,
    })
})

app.listen(PORT, () => {
    console.log(`Server live at http://uhh...:${PORT}`)
})
