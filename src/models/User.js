import mongoose, { Schema } from "mongoose";
import Project from "./Project";

const userDb = mongoose.connection.useDb("Users");
const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: true,
			unique: [true, "Email Already Exist!"],
		},
		password: String,
		provider: {
			type: String,
			default: "credentials",
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

UserSchema.virtual("projects", {
	ref: Project,
	localField: "_id",
	foreignField: "admin",
});
const User = userDb.model("Users", UserSchema);
export default User;
