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
		axios
			.get("/api/project")
			.then((data) => setProjects(data.data.data.projects));
	}, []);

	// setting activeProject
	useEffect(() => {
		// if activeProject already exist in localstorage
		// check if localstorage_activeProject still exist in database by checking projects state
		//  - set activeProject state to the existing value in localstorage
		// else if localstorage_activeProject does not exist
		// set activeProject to projects[0]
		// else if localstorage doesn't have a valid activeProject
		// set activeProject to projects[0]
		const localActiveProject = JSON.parse(
			localStorage.getItem("activeProject"),
		);
		if (localActiveProject !== null) {
			if (projects.find((item) => item.id === localActiveProject.id)) {
				setActiveProject(localActiveProject);
			} else {
				localStorage.removeItem("activeProject");
				if (!projects[0]) return;
				setActiveProject(projects[0]);
				localStorage.setItem(
					"activeProject",
					JSON.stringify(projects[0]),
				);
			}
		} else {
			if (!projects[0]) return;

			setActiveProject(projects[0] ? projects[0] : "");
			localStorage.setItem("activeProject", JSON.stringify(projects[0]));
		}
	}, [projects]);

	// fetching teams related to active project
	useEffect(() => {
		if (!activeProject) return;
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
