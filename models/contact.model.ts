import { model, models, Schema } from "mongoose";

const contactSchema = new Schema({
    name: String,
    email: String,
    comment: String,
}, { timestamps: true })
const ContactModel = models.contact || model("contact", contactSchema)
export default ContactModel