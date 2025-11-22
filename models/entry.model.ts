import mongoose, { model, models, Schema } from "mongoose";

const entrySchema = new Schema({
  description: String,
  date: String,
  value: Number,
  type: String,
  parcels: Number,
  card: { type: mongoose.Types.ObjectId, ref: "Card" },
});
const EntryModel = models.entry || model("entry", entrySchema);
export default EntryModel;
