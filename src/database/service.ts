import mongoose from 'mongoose'
import { dbConfig } from '../helpers/config'
// @zakhaev26, this is unacceptable behaviour, you don't touch my configs, I will have to culture you

const connectionURI = dbConfig.dbURI;
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
