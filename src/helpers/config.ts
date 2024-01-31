import dotenv from 'dotenv'
dotenv.config()

export const appConfig: Record<string, string> = {
    "hostProd": process.env.HOST_PROD || 'localhost',
    "portProd": process.env.PORT_PROD || '3000'
}

export const dbConfig: Record<string, string> = {
    "dbUser": process.env.MONGO_USER??"",
    "dbPassword": process.env.MONGO_PASSWORD??"",
    "dbURI": process.env.DB_URI??""
}
