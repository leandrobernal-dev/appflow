"use client";

import UserDataContextProvider from "@/context/UserDataContext";
import NavBar from "@/layout/NavBar";
import Sidebar from "@/layout/SideBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AccountLayout({ children }) {
	const [projects, setProjects] = useState([]);
	const [activeProject, setActiveProject] = useState("");

	const [teams, setTeams] = useState([]);

	// fetch user projects
	useEffect(() => {
		axios
			.get("/api/project")
			.then((data) => setProjects(data.data.data.projects));
	}, []);

	// setting activeProject
	useEffect(() => {
		if (localStorage.getItem("activeProject") && !activeProject) {
			if (!projects[0]) return;
			setActiveProject(projects[0]);
			return;
		}

		if (localStorage.getItem("activeProject") !== null) {
			const project = JSON.parse(localStorage.getItem("activeProject"));

			// if a project is saved in localstorage but deleted, set a new active project
			if (projects.find((item) => item.id === project.id)) {
				setActiveProject(project);
			} else {
				setActiveProject(projects[0]);
				localStorage.setItem(
					"activeProject",
					JSON.stringify(projects[0]),
				);
			}
		} else {
			setActiveProject(projects[0]);
			localStorage.setItem("activeProject", JSON.stringify(projects[0]));
		}
	}, [projects]);

	// fetching teams related to active project
	useEffect(() => {
		if (!activeProject.id) return;
		axios
			.get("/api/teams?id=" + activeProject.id)
			.then((data) => setTeams(data.data.teams.teams));
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

				{children}
			</main>
		</UserDataContextProvider>
	);
}
