import CustomDropDown from "@/components/CustomDropDown";
import { UserDataContext } from "@/context/UserDataContext";
import {
	AccountCircleRounded,
	AddCircleRounded,
	ArrowDropDownCircleOutlined,
	DarkModeOutlined,
	NotificationsRounded,
	PriorityHighRounded,
} from "@mui/icons-material";
import { useContext } from "react";

export default function NavButtons({ isMobile }) {
	const { projects, activeProject, setActiveProject } =
		useContext(UserDataContext);
	const projectsDropdown = projects.map((project) => {
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
					<a
						href="/account/newproject"
						className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<AddCircleRounded /> <span>New Project</span>
					</a>
				</div>
				<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
					{projects.length < 1 ? (
						<li>
							<span className="pointer-events-none block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
								<PriorityHighRounded />
								<span>You Have no Projects</span>
							</span>
						</li>
					) : (
						projectsDropdown
					)}
				</ul>
			</CustomDropDown>

			<button className="rounded-lg bg-secondary-dark p-2 text-text-dark dark:bg-secondary-light">
				<DarkModeOutlined />
			</button>
			<button className="rounded-lg bg-secondary-light p-2">
				<AccountCircleRounded />
			</button>
		</>
	);
}
