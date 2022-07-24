// import dotenv from "dotenv";
require("dotenv").config();
// dotenv.config();
// import connectDB from "./db/connect.js";
const connectDB = require("./db/connect.js");

// import Model from "./models/product.js"
const Model = require("./models/product.js");
const jsonProduct = require("./products.json");
// import jsonProduct from "./products.json"

const start = async () => {
  try {
    console.log("ssss");
    await connectDB(process.env.MONGO_URI);
    await Model.deleteMany();
    await Model.create(jsonProduct);
    console.log("success");
    process.exit(0)
  } catch (error) {
    console.log(error);
  }
};
start();
