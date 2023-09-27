import CustomDropDown from "@/components/CustomDropDown";
import { UserDataContext } from "@/context/UserDataContext";
import { signOut } from "next-auth/react";
import {
	AccountCircleRounded,
	AddCircleRounded,
	ArrowDropDownCircleOutlined,
	DarkModeOutlined,
	LogoutRounded,
	NotificationsRounded,
	PriorityHighRounded,
} from "@mui/icons-material";
import { useContext } from "react";
import Link from "next/link";

export default function NavButtons({ isMobile }) {
	const { projects, activeProject, setActiveProject } =
		useContext(UserDataContext);

	const userProject = projects.filter(
		(projectMember) => projectMember.role === "admin",
	);
	const projectInvite = projects.filter(
		(projectMember) => projectMember.role === "member",
	);

	const userProjectsList = userProject.map(({ project }) => {
		return (
			<li key={"nav-button" + project.id}>
				<button
					onClick={() => {
						setActiveProject(project);
						localStorage.setItem(
							"activeProject",
							JSON.stringify(project),
						);
						document.body.click(); // hide dropdown by clicking html body
					}}
					className={`block w-full px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
						activeProject
							? activeProject.id === project.id
								? "font-black"
								: ""
							: ""
					}`}
				>
					<span>{project.name}</span>
				</button>
			</li>
		);
	});
	const projectInviteList = projectInvite.map(({ project }) => {
		return (
			<li key={"nav-button" + project.id}>
				<button
					onClick={() => {
						setActiveProject(project);
						localStorage.setItem(
							"activeProject",
							JSON.stringify(project),
						);
						document.body.click(); // hide dropdown by clicking html body
					}}
					className={`block w-full px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
						activeProject
							? activeProject.id === project.id
								? "font-black"
								: ""
							: ""
					}`}
				>
					<span>{project.name}</span>
				</button>
			</li>
		);
	});

	return (
		<>
			<button className="rounded-lg bg-secondary-light p-2 ">
				<NotificationsRounded />
			</button>

			<button
				data-dropdown-toggle={
					isMobile
						? "mobile-project-select-dropdown"
						: "project-select-dropdown"
				}
				className="flex items-center justify-between gap-1 rounded-lg bg-primary p-2 text-text-dark dark:text-text-light"
			>
				<span className="w-32 truncate text-start">
					{activeProject ? activeProject.name : "Select Project"}
				</span>
				<ArrowDropDownCircleOutlined />
			</button>
			<CustomDropDown
				id={
					isMobile
						? "mobile-project-select-dropdown"
						: "project-select-dropdown"
				}
			>
				<div>
					<Link
						href="/account/newproject"
						className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<AddCircleRounded /> <span>New Project</span>
					</Link>
				</div>
				<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
					<li className="pointer-events-none block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
						My Projects: <span>{userProject.length}</span>
					</li>
					{userProject.length < 1 ? (
						<li>
							<span className="pointer-events-none block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
								<PriorityHighRounded />
								<span>You Have no Projects</span>
							</span>
						</li>
					) : (
						userProjectsList
					)}
				</ul>
				<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
					<li className="pointer-events-none block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
						Project Invites: <span>{projectInvite.length}</span>
					</li>
					{projectInviteList}
				</ul>
			</CustomDropDown>

			<button className="rounded-lg bg-secondary-dark p-2 text-text-dark dark:bg-secondary-light">
				<DarkModeOutlined />
			</button>
			<button
				data-dropdown-toggle={
					isMobile ? "mobile-account-dropdown" : "account-dropdown"
				}
				className="rounded-lg bg-secondary-light p-2"
			>
				<AccountCircleRounded />
			</button>
			<CustomDropDown
				id={isMobile ? "mobile-account-dropdown" : "account-dropdown"}
			>
				<div>
					<button
						className="block w-full px-4 py-2 text-start hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						onClick={() => signOut()}
					>
						<LogoutRounded />
						<span>Logout</span>
					</button>
				</div>
			</CustomDropDown>
		</>
	);
}
