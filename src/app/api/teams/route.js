import dbConnect from "@/db/database";
import Project from "@/models/Project";
import ProjectMember from "@/models/ProjectMember";
import Team from "@/models/Team";
import TeamMember from "@/models/TeamMember";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request) => {
	await dbConnect();

	try {
		const { user } = await getServerSession();
		const { searchParams } = new URL(request.url);
		if (searchParams.get("id")) {
			const projectId = searchParams.get("id").toString().trim();
			const account = await User.findOne({ email: user.email });
			let data = await Project.findById(projectId).populate("teams");

			const isAdmin = account.id === data.admin.toJSON();
			if (isAdmin) {
				return NextResponse.json({ teams: data });
			}

			const projectMember = await TeamMember.find({
				user: account,
			}).populate({ path: "team", model: Team });

			// TODO: return data for non admins
			return NextResponse.json({ projectMember });
		}
	} catch (error) {
		return NextResponse.json(error);
	}

	return NextResponse.json();
};

export const POST = async (request) => {
	try {
		const { user } = await getServerSession();
		const account = await User.findOne({ email: user.email });

		const { name, description, project } = await request.json();
		const newTeam = new Team({
			name,
			description,
			project,
		});
		await newTeam.save();
		return NextResponse.json({ msg: "Success", data: newTeam });
	} catch (error) {
		return NextResponse.json({ error });
	}
};
