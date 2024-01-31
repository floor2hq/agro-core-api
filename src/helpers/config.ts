import dotenv from 'dotenv'
dotenv.config()

export const appConfig: Record<string, string> = {
    "hostProd" : process.env.HOST_PROD || 'localhost',
    "portProd" : process.env.PORT_PROD || '3000'
}
