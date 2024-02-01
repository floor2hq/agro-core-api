import mongoose from 'mongoose'
// import { dbConfig } from '../helpers/config'
// Fuck Your Configs , @majorbruteforce
// I Wasted ~30mins here
const connectionURI = `mongodb+srv://soubhik:soubhik@cluster0.1vpjft8.mongodb.net/?retryWrites=true&w=majority`;
export var db: mongoose.Connection;

async function connectToDB() {
    try {
        await mongoose.connect(connectionURI);
        console.log("Connection Successful")
        
        // Fuck your db.ons again
        
        // db = mongoose.connection
        // db.on('error', (e: Error) => {
        //     console.log(`Error connecting to database: ${e.message}`)
        // })

        // db.once('open', () => {
        //     console.log("Database connection successful");
        // })

    } catch (e: any) {
        console.log(e.message)
    }
}

export default connectToDB
