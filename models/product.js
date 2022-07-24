import Mongoose from 'mongoose'
const productSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa" , "marcos"],
      Message: "{value} is not supported",
    },
    // enum:["ikea" , "liddy" , "caressa"],//if we need to limit the properties to given things
  },
});

const Model = Mongoose.model("Product", productSchema);
export default Model;

