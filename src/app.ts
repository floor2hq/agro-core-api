import express from 'express'
import dotenv from 'dotenv'
import { appConfig } from './helpers/config'
dotenv.config()

const app = express();

const HOST = appConfig.hostProd 
const PORT = parseInt(appConfig.portProd , 10)

app.get('/', (_, res) => {
    res.json({
        "message" : "Working!"
    })
})

app.listen(PORT, HOST, () => {
    console.log(`Server live at http://${HOST}:${PORT}`)
})