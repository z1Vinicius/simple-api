import mongoose from "mongoose";

export const authorSchema = new mongoose.Schema(
	{
		name: { type: String, require: true },
		description: { type: String, require: true },
	},
	{ versionKey: false }
);

const authorModel = mongoose.model("author", authorSchema);

export default authorModel;
