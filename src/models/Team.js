import mongoose, { Schema } from "mongoose";
import TeamMember from "./TeamMember";

const teamDb = mongoose.connection.useDb("Teams");
const TeamsSchema = new Schema(
	{
		project: {
			type: Schema.Types.ObjectId,
			ref: "Project",
			required: true,
		},
		name: {
			type: String,
			required: [true, "Team NAME is required to create a new Team"],
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
TeamsSchema.virtual("teammembers", {
	ref: TeamMember,
	localField: "_id",
	foreignField: "team",
});

const Team = teamDb.model("Teams", TeamsSchema);
export default Team;
