"use client";

import AuthProvider from "@/context/AuthProvider";
import UserDataContextProvider from "@/context/UserDataContext";
import NavBar from "@/layout/NavBar";
import Sidebar from "@/layout/SideBar";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AccountLayout({ children, Session }) {
	const [projects, setProjects] = useState([]);
	const [activeProject, setActiveProject] = useState();
	const [projectMembers, setProjectMembers] = useState([]);
	const [user, setUser] = useState();

	const [teams, setTeams] = useState([]);

	// fetch user projects
	useEffect(() => {
		axios.get("/api/project").then(({ data }) => {
			setProjects(data.data.projects);
		});
	}, []);

	// fetch project members
	useEffect(() => {
		if (!activeProject) return;
		if (!activeProject.id) return;
		axios.get("/api/project?id=" + activeProject.id).then(({ data }) => {
			setProjectMembers(data.data.members);
		});
	}, [activeProject]);

	// setting activeProject
	useEffect(() => {
		const localActiveProject = JSON.parse(
			localStorage.getItem("activeProject"),
		);
		if (localActiveProject !== null) {
			// console.log("project found on local storage");
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
			// console.log("no project found on localstorage");

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
			setTeams(data.teams.teams);
		});
	}, [activeProject]);

	return (
		<AuthProvider session={Session}>
			<UserDataContextProvider
				value={{
					projects,
					setProjects,
					activeProject,
					setActiveProject,
					teams,
					projectMembers,
					user,
					setUser,
					activeProject,
				}}
			>
				<main className="h-full pt-20 sm:pl-56">
					<Sidebar />
					<NavBar />

					<div className="h-full">{children}</div>
				</main>
			</UserDataContextProvider>
		</AuthProvider>
	);
}
