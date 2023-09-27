import mongoose, { Schema } from "mongoose";

const teamMemberDb = mongoose.connection.useDb("TeamMembers");
const TeamMemberSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		project: {
			type: Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
		team: {
			type: Schema.Types.ObjectId,
			ref: "Team",
			required: true,
		},
		role: {
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

const TeamMember = teamMemberDb.model("TeamMembers", TeamMemberSchema);
export default TeamMember;
