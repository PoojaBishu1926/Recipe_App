import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});

// Define a method to create a new user
userSchema.statics.createUser = async function ({ username, password }) {
  try {
    // Create a new user document
    const newUser = new this({ username, password });
    // Save the user to the database
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

export const userModel = mongoose.model("users", userSchema);
