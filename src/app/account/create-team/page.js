"use client";
import { UserDataContext } from "@/context/UserDataContext";
import axios from "axios";
import { useContext } from "react";

export default function CreateTeamPage() {
	const { activeProject } = useContext(UserDataContext);
	function handleNewTeamSubmit(e) {
		e.preventDefault();
		const { name, description } = e.currentTarget.elements;
		axios
			.post("/api/teams", {
				name: name.value,
				description: description.value,
				project: activeProject.id,
			})
			.then((data) => {
				console.log(data);
			});
	}
	return (
		<form
			onSubmit={handleNewTeamSubmit}
			className="flex w-full max-w-2xl flex-col gap-2 p-6"
		>
			<h1 className="py-4 text-3xl font-black">Create Team</h1>
			<div>
				<label htmlFor="new-team-name" className="block">
					Team Name
				</label>
				<input
					type="text"
					id="new-team-name"
					autoFocus
					name="name"
					required
					className="w-full rounded-lg bg-secondary-light"
				/>
			</div>
			<div>
				<label htmlFor="new-team-description" className="block">
					Description
				</label>
				<input
					type="text"
					name="description"
					id="new-team-description"
					required
					className="w-full rounded-lg bg-secondary-light"
				/>
			</div>

			<button className="rounded-lg bg-primary p-2 text-text-dark">
				Create Team
			</button>
		</form>
	);
}
