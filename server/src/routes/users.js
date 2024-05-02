import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/users.js";
const router = express.Router();

// router.post("/register", async (req, res) => {
//   console.log(req.body);
//   const { username, password } = req.body;
//   const user = await userModel.findOne({ username });
//   console.log(user);
//   res.json(user);
// });

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    console.log(user); // Log user data for debugging

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    let hasedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel({
      username,
      password: hasedPassword,
    });
    await newUser.save();
    console.log(newUser);

    res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  const user = await userModel.findOne({ username });

  if (!user) {
    return res.json({ status: 400, message: "User does not exist" });
  }

  let isValidpassword = await bcrypt.compare(password, user.password);

  if (!isValidpassword) {
    return res.json({ status: 400, message: "User Or password is incorrect" });
  }

  let token = jwt.sign({ id: user._id }, "secret");
  res.json({ status: 200, token, userID: user._id });
});
export { router as userRouter };
