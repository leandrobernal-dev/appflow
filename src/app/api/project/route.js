import dbConnect from "@/db/database";
import Project from "@/models/Project";
import User from "@/models/User";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export const GET = async () => {
	await dbConnect();

	try {
		const { user } = await getServerSession();
		try {
			const data = await User.findOne({ email: user.email }).populate(
				"projects",
			);
			return NextResponse.json({ data });
		} catch (error) {
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
			user: account._id,
			name,
			description,
		});
		await newProject.save();

		return NextResponse.json({ msg: "Success", data: newProject });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error }, { status: 500 });
	}
};
