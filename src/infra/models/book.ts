import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true},
  author: {type: String},
  publisher: {type: String},
  pages: {type: Number},
  price: {type: Number},
}, {versionKey: false})


const bookModel = mongoose.model("library", bookSchema)

export default bookModel;