import mongoose from "mongoose";
import { authorSchema } from "./author";

const bookSchema = new mongoose.Schema(
	{
		title: { type: String, required: [true, "O título do livro é obrigatório"] },
		author: authorSchema,
		publisher: { type: String, enum: { values: ["Veja"], message: "A editoria '{VALUE}' não é válida" } },
		pages: {
			type: Number,
			validate: {
				validator: (value) => {
					return value >= 10 && value <= 5000;
				},
				message: "O número de páginas tem que está entre 10 e 5000. O Valor fornecido foi {VALUE}",
			},
		},
		price: { type: Number, min: [0, "O preço mínimo não pode ser negativo"] },
	},
	{ versionKey: false }
);

const bookModel = mongoose.model("books", bookSchema);

export default bookModel;
