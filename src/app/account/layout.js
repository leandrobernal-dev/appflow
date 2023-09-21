"use client";

import UserDataContextProvider from "@/context/UserDataContext";
import NavBar from "@/layout/NavBar";
import Sidebar from "@/layout/SideBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AccountLayout({ children }) {
	const [projects, setProjects] = useState([]);
	const [activeProject, setActiveProject] = useState("");

	useEffect(() => {
		const isProjectsLoaded = projects.length !== 0;
		if (!isProjectsLoaded) return;

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

	// fetch user projects
	useEffect(() => {
		axios
			.get("/api/project")
			.then((data) => setProjects(data.data.data.projects));
	}, []);
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
