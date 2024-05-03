import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes",recipesRouter)

mongoose.connect(
  "mongodb+srv://poojabishu96:pooja1926@recipes.cyjrxdf.mongodb.net/Recipes?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


app.listen(PORT, () => console.log(`App Listning on Port ${PORT}`));
