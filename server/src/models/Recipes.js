import mongoose from "mongoose";

const ReciepeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [{ type: String, required: true }],
  },
  instructions: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  imageUrl: { type: String, require: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const ReciepeModel = mongoose.model("recipes", ReciepeSchema);
