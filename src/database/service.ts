import mongoose from 'mongoose'
import { dbConfig } from '../helpers/config'

const connectionURI = dbConfig.dbURI
export var db: mongoose.Connection;

async function connectToDB() {
    try {
        mongoose.connect(connectionURI);
        db = mongoose.connection

        db.on('error', (e: Error) => {
            console.log(`Error connecting to database: ${e.message}`)
        })

        db.once('open', () => {
            console.log("Database connection successfull");
        })

    } catch (e: any) {
        console.log(e.message)
    }
}

export default connectToDB
