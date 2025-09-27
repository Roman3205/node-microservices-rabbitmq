import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB)
    } catch (error) {
        console.log('Failed to connect to MongoDB', error)
        if (process.env.NODE_ENV === 'production') process.exit(1)
    }
}

export const disconnectDb = async () => {
    try {
        await mongoose.disconnect()
        console.log('Disconnected from MongoDB')
    } catch (error) {
        console.log('Failed to disconnect from MongoDB', error)
    }
}