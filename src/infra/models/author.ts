import mongoose from "mongoose";

export const authorSchema = new mongoose.Schema(
	{
		name: { type: String, required: [true, "O nome do autor é obrigatório"] },
		description: { type: String },
	},
	{ versionKey: false }
);

const authorModel = mongoose.model("author", authorSchema);

export default authorModel;
