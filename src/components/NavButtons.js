import { UserDataContext } from "@/context/UserDataContext";
import { NotificationsActiveOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { ProjectMenuDropdown } from "./ProjectsDropdownMenu";
import { ProfileDropdownMenu } from "./ProfileDropdownMenu";
import ProjectInviteModal from "./ProjectInviteModal";

export default function NavButtons() {
	const { projects, activeProject, setActiveProject } =
		useContext(UserDataContext);

	const userProject = projects.filter(
		(projectMember) => projectMember.role === "admin",
	);
	const projectInvite = projects.filter(
		(projectMember) => projectMember.role === "member",
	);

	return (
		<>
			<button>
				<NotificationsActiveOutlined />
			</button>

			<ProjectInviteModal />

			<ProjectMenuDropdown
				activeProject={activeProject}
				setActiveProject={setActiveProject}
				userProject={userProject}
				projectInvite={projectInvite}
			/>

			<ProfileDropdownMenu />
		</>
	);
}
