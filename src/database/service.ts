import mongoose from 'mongoose'
import { dbConfig } from '../helpers/config'

const connectionURI = dbConfig.dbURI

async function connectToDB() {
    try {
        mongoose.connect(connectionURI);
        console.log("Connection successful");
    }catch(e :any) {
        console.log(e.message)
    }
}

export default connectToDB
