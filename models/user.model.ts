import { model, models, Schema } from "mongoose"

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
}, { timestamps: true })
const UserModel = models.user || model("user", userSchema)
export default UserModel