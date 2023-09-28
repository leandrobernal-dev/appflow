import ProjectInvite from "@/models/ProjectInvite";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	try {
		const { emails, project } = await request.json();

		await emails.forEach(async (email) => {
			const projectInvite = new ProjectInvite({
				project,
				email,
			});
			await projectInvite.save();
		});

		return NextResponse.json({ msg: "success", project });
	} catch (error) {
		console.log(error);
	}
};
