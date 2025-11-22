import { connectToMongo } from "@/lib/db/mongo";
import CardModel from "@/models/card.model";
import { connect } from "http2";
import mongoose from "mongoose";

export async function saveOrUpdate(data: any) {
  const { name, duedate } = data;
  await connectToMongo();
  let result;
  if (!data._id) {
    result = await CardModel.create({ name, duedate });
  }
  result = await CardModel.findByIdAndUpdate(data._id, data);
  await mongoose.connection.close();
  return { error: false, success: true, data: result };
}
export async function findAll() {
  await connectToMongo();
  const list = await CardModel.find();
  let result = { error: true, success: false, data: list };
  if (list.length > 0) {
    result = { ...result, error: false, success: true };
  }
  await mongoose.connection.close();
  return result;
}
export async function deleteItem(data: any) {
  let result;
  try {
    await connectToMongo();
    const teste = await CardModel.findOneAndDelete({ _id: data._id });
    await mongoose.connection.close();
    result = { error: false, success: true };
  } catch (e) {
    console.log(e);
    result = { error: true, success: true, message: "500 - system error" };
  }
  return result;
}
