import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI
const MONGO_PASS = process.env.MONGO_PASSWORD
const MONGO_USER = process.env.MONGO_USERNAME
export const connectToMongo = async () => {
    if (MONGO_URI) {
        try {
            await mongoose.connect(MONGO_URI, { authSource: "admin", user: MONGO_USER, pass: MONGO_PASS })
            console.log("mongo db connected")
        } catch (e: any) {
            console.error("connection error!", e.errorResponse)
        }
    } else {
        console.error("Mongo URL not found")
    }
}