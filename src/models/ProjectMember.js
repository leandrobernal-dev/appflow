import mongoose, { Schema } from "mongoose";

const projectMemberDb = mongoose.connection.useDb("ProjectMembers");
const ProjectMemberSchema = new Schema(
	{
		project: {
			type: Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		role: String,
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

const ProjectMember = projectMemberDb.model(
	"ProjectMembers",
	ProjectMemberSchema,
);
export default ProjectMember;
