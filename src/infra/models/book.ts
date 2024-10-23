import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		title: { type: String, required: [true, "O título do livro é obrigatório"] },
		author: {
			type: mongoose.Types.ObjectId,
			ref: "author",
			required: [true, "O autor é obrigatório"],
		},
		publisher: {
			type: String,
			enum: {
				values: ["Veja"],
				message: "A editoria '{VALUE}' não é válida",
			},
		},
		pages: {
			type: Number,
			validate: {
				validator: (value) => {
					return value >= 1 && value <= 5000;
				},
				message: "O número de páginas tem que estar entre 1 e 5000. O valor fornecido foi {VALUE}",
			},
		},
		price: {
			type: Number,
			min: [0, "O preço mínimo não pode ser negativo"],
		},
	},
	{ versionKey: false }
);

const bookModel = mongoose.model("books", bookSchema);

export default bookModel;
