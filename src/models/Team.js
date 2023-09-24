import mongoose, { Schema } from "mongoose";

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

const Team = teamDb.model("Teams", TeamsSchema);
export default Team;
