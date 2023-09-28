import mongoose, { Schema } from "mongoose";
import Team from "./Team";
import ProjectMember from "./ProjectMember";

const projectDb = mongoose.connection.useDb("Projects");
const ProjectSchema = new Schema(
	{
		admin: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			required: [true, "Project NAME is required to create a project"],
		},
		description: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);
ProjectSchema.virtual("teams", {
	ref: Team,
	localField: "_id",
	foreignField: "project",
});
ProjectSchema.virtual("members", {
	ref: ProjectMember,
	localField: "_id",
	foreignField: "project",
});

const Project = projectDb.model("Projects", ProjectSchema);
export default Project;
