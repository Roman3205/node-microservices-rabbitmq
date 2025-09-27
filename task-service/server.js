import express from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { connectDb, disconnectDb } from './config/db.js'
import routes from './routes/index.js'
import rabbitMQ from './broker/index.js'
const app = express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(helmet())

const startServer = async () => {
    try {
        await connectDb()
        await rabbitMQ()
        app.use('/api', routes)
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log('Failed to start a server', error) 

        if (process.env.NODE_ENV === 'production') process.exit(1)
    }
}

startServer()

const handleServerShutdown = async () => {
    try {
        await disconnectDb()
        console.log('Shutting down server...')
        process.exit(0)
    } catch (error) {
        console.log('Error during server shutdown', error)
    }
}

process.on('SIGTERM', handleServerShutdown)
process.on('SIGINT', handleServerShutdown)