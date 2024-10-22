import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
	validator: (value: string) => value !== "",
	message: ({ path }) => {
		return `Um campo '${path}' foi passado em branco`;
	},
});
