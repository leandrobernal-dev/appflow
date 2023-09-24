"use client";

import UserDataContextProvider from "@/context/UserDataContext";
import NavBar from "@/layout/NavBar";
import Sidebar from "@/layout/SideBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AccountLayout({ children }) {
	const [projects, setProjects] = useState([]);
	const [activeProject, setActiveProject] = useState();

	const [teams, setTeams] = useState([]);

	// fetch user projects
	useEffect(() => {
		axios.get("/api/project").then(({ data }) => {
			setProjects(data.data.projects);
		});
	}, []);

	// setting activeProject
	useEffect(() => {
		const localActiveProject = JSON.parse(
			localStorage.getItem("activeProject"),
		);
		if (localActiveProject !== null) {
			console.log("project found on local storage");
			if (
				projects.find(
					(item) => item.project.id === localActiveProject.id,
				)
			) {
				setActiveProject(localActiveProject);
			} else {
				if (!projects[0]) return;
				localStorage.removeItem("activeProject");
				setActiveProject(projects[0].project);
				localStorage.setItem(
					"activeProject",
					JSON.stringify(projects[0].project),
				);
			}
		} else if (projects[0]) {
			console.log("no project found on localstorage");

			setActiveProject(projects[0] ? projects[0].project : "");
			localStorage.setItem(
				"activeProject",
				JSON.stringify(projects[0].project),
			);
		}
	}, [projects]);

	// fetching teams related to active project
	useEffect(() => {
		if (!activeProject) return;
		axios.get("/api/teams?id=" + activeProject.id).then(({ data }) => {
			console.log(data);
			setTeams(data.teams);
		});
	}, [activeProject]);

	return (
		<UserDataContextProvider
			value={{
				projects,
				setProjects,
				activeProject,
				setActiveProject,
			}}
		>
			<main className="pt-20 sm:pl-48 ">
				<Sidebar />
				<NavBar />

				<div className="p-4">{children}</div>
			</main>
		</UserDataContextProvider>
	);
}
