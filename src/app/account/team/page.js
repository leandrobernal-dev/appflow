"use client";

import { UserDataContext } from "@/context/UserDataContext";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function TeamPage() {
	const { teams } = useContext(UserDataContext);
	if (!teams[0])
		return (
			<div className="flex h-full w-full items-center justify-center">
				<div>Loading...</div>
			</div>
		);

	redirect("/account/team/" + teams[0].id);
}
