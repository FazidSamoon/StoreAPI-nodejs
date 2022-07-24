import Express from "express";
import 'express-async-errors'
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import router from "./routes/products.routes.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { notFound } from "./middleware/not-found.js";

dotenv.config();
const app = Express();

app.use(Express.json());

//routes
app.get("/", (req, res) => {
  res.send('<h1>StoreAPI</h1> <a href="./api/v1/products">products</a>');
});

app.use("/api/v1/products" , router)
app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log("server is up and running"));
  } catch (error) {
    console.log(error);
  }
};

start();
