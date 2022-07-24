import Mongoose from "mongoose";

const connectDB = () => {
  return Mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
    .then(() => console.log("connected to the db"))
    .catch((err) => console.log(err));
};

export default connectDB;
