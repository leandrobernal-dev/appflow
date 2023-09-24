"use client";

import { UserDataContext } from "@/context/UserDataContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function NewProjectPage() {
	const router = useRouter();
	const { setActiveProject, setProjects } = useContext(UserDataContext);

	function handleNewProjectSubmit(e) {
		e.preventDefault();
		const { name, description } = e.currentTarget.elements;
		axios
			.post("/api/project", {
				name: name.value,
				description: description.value,
			})
			.then(({ data }) => {
				setActiveProject(data.project);
				setProjects((prevProjects) => {
					const newProjects = [...prevProjects];
					newProjects.push(data.project);
					return newProjects;
				});
				if (data) {
					localStorage.setItem(
						"activeProject",
						JSON.stringify(data.project),
					);
				}
				router.push("/account");
			})
			.catch((error) => {
				console.log(error);
			});
	}
	return (
		<form
			onSubmit={handleNewProjectSubmit}
			className="flex w-full max-w-2xl flex-col gap-2 p-6"
		>
			<h1 className="py-4 text-3xl font-black">New Project</h1>
			<div>
				<label htmlFor="new-project-name" className="block">
					Project Name
				</label>
				<input
					type="text"
					id="new-project-name"
					autoFocus
					name="name"
					className="w-full rounded-lg bg-secondary-light"
				/>
			</div>
			<div>
				<label htmlFor="new-project-description" className="block">
					Description
				</label>
				<input
					type="text"
					name="description"
					id="new-project-description"
					className="w-full rounded-lg bg-secondary-light"
				/>
			</div>

			<button className="rounded-lg bg-primary p-2 text-text-dark">
				Create Project
			</button>
		</form>
	);
}
