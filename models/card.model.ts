import mongoose, { model, models, Schema } from "mongoose";

const cardSchema = new Schema({
  name: String,
  duedate: String,
  owner: {type: mongoose.Types.ObjectId, ref: "User"}
});
const CardModel = models.card || model("card", cardSchema);
export default CardModel;
