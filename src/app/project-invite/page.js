import dbConnect from "@/db/database";
import Project from "@/models/Project";
import ProjectInvite from "@/models/ProjectInvite";
import ProjectMember from "@/models/ProjectMember";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function InvitePage(request) {
	await dbConnect();
	const { searchParams } = request;
	const projectId = searchParams.inviteid;

	if (!projectId) {
		notFound();
	}

	const { user } = await getServerSession();

	const projectInvite = await ProjectInvite.findOne({
		project: projectId,
		email: user.email,
	});
	if (!projectInvite) {
		notFound();
	}

	const handleSubmit = async (formData) => {
		"use server";

		const project = await Project.findById(projectId);
		const projectInvite = await ProjectInvite.findOne({ project });
		const account = await User.findOne({ email: user.email });

		const newProjectMember = new ProjectMember({
			project,
			user: account._id,
			role: "member",
		});
		await projectInvite.deleteOne();
		await newProjectMember.save();

		redirect("/account");
	};
	return (
		<div>
			{searchParams.inviteid}
			<form action={handleSubmit}>
				<input
					type="email"
					defaultValue={user.email}
					hidden
					name="email"
				/>
				<button className="rounded-lg bg-primary p-2 text-text-dark">
					Accept Invite
				</button>
			</form>
			<p>
				You are logged in as: <span>{user.email}</span>
			</p>
		</div>
	);
}
