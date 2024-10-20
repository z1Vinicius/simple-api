import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  id: { typeof: mongoose.Schema.Types.ObjectId},
  title: { typeof: mongoose.Schema.Types.String, require: true},
  author: {typeof: mongoose.Schema.Types.String},
  publisher: {typeof: mongoose.Schema.Types.String},
  pages: {typeof: mongoose.Schema.Types.Number},
  price: {typeof: mongoose.Schema.Types.Number},
}, {versionKey: false})


const bookModel = mongoose.model("library", bookSchema)

export default bookModel;