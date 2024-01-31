import mongoose from 'mongoose'
import { dbConfig } from '../helpers/config'

const connectionURI= dbConfig.dbURI

mongoose.connect(connectionURI)