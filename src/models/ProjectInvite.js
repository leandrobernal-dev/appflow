import mongoose, { Schema } from "mongoose";

const projectInvite = mongoose.connection.useDb("ProjectInvite");
const ProjectInviteSchema = new Schema(
	{
		project: {
			type: Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

const ProjectInvite = projectInvite.model("ProjectInvite", ProjectInviteSchema);
export default ProjectInvite;
