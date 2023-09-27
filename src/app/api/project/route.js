import dbConnect from "@/db/database";
import Project from "@/models/Project";
import ProjectMember from "@/models/ProjectMember";
import Team from "@/models/Team";
import TeamMember from "@/models/TeamMember";
import User from "@/models/User";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export const GET = async () => {
	await dbConnect();

	try {
		const { user } = await getServerSession();
		const account = await User.findOne({ email: user.email });

		try {
			const projects = await ProjectMember.find({
				user: account,
			}).populate({
				path: "project",
				model: Project,
			});

			const data = { projects };
			return NextResponse.json({ data });
		} catch (error) {
			console.log(error);
			return NextResponse.json({ msg: error.message }, { status: 500 });
		}
	} catch (error) {
		return NextResponse.json(
			{ msg: "Please log in to your Account." },
			{ status: 401 },
		);
	}
};

export const POST = async (request) => {
	await dbConnect();

	try {
		const { user } = await getServerSession();
		const email = user.email;
		const account = await User.findOne({ email });

		const { name, description } = await request.json();
		const newProject = new Project({
			admin: account._id,
			name,
			description,
		});
		await newProject.save();
		const newProjectMember = new ProjectMember({
			project: newProject,
			user: account._id,
			role: "admin",
		});
		await newProjectMember.save();

		const project = await ProjectMember.findOne({
			user: account,
			project: newProject,
		}).populate({
			path: "project",
			model: Project,
		});
		console.log(project);

		return NextResponse.json({ msg: "Success", data: project });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error }, { status: 500 });
	}
};

export const DELETE = async (request) => {
	await dbConnect();

	try {
		const { user } = await getServerSession();
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id").toString();

		const project = await Project.findById(id);
		await Team.deleteMany({ project });
		await ProjectMember.deleteMany({ project });
		await TeamMember.deleteMany({ project });
		await project.deleteOne();

		return NextResponse.json({ msg: "Project deleted Successfully" });
	} catch (error) {
		console.log(error);
	}
};
