import mongoose from "mongoose";
import { authorSchema } from "./author";

const bookSchema = new mongoose.Schema(
	{
		title: { type: String, required: [true, "O título do livro é obrigatório"] },
		author: authorSchema,
		publisher: { type: String },
		pages: { type: Number },
		price: { type: Number },
	},
	{ versionKey: false }
);

const bookModel = mongoose.model("books", bookSchema);

export default bookModel;
