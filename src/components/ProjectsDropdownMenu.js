import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
	ChevronDownCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function ProjectMenuDropdown({
	activeProject,
	userProject,
	projectInvite,
	setActiveProject,
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					{activeProject ? activeProject.name : "Select Project"}
					<ChevronDownCircle className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<Link href={"/account/newproject"}>
					<DropdownMenuItem>
						<Plus className="mr-2 h-4 w-4" />
						New Project
						<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />

				<DropdownMenuLabel>My Projects</DropdownMenuLabel>
				{userProject.length < 1 ? (
					<DropdownMenuItem disabled>
						<span>You have no Projects</span>
					</DropdownMenuItem>
				) : (
					<DropdownMenuRadioGroup
						value={
							activeProject
								? userProject.findIndex(
										({ project }) =>
											project.id ===
											(activeProject
												? activeProject.id
												: "null"),
								  )
								: "null"
						}
						onValueChange={(e) => {
							setActiveProject(userProject[e].project);
							localStorage.setItem(
								"activeProject",
								JSON.stringify(userProject[e].project),
							);
						}}
					>
						{userProject.map(({ project }, index) => {
							return (
								<DropdownMenuRadioItem
									key={"navbutton" + project.id}
									value={index}
								>
									{project.name}
								</DropdownMenuRadioItem>
							);
						})}
					</DropdownMenuRadioGroup>
				)}
				<DropdownMenuLabel>Project Invites</DropdownMenuLabel>
				{projectInvite.length < 1 ? (
					<DropdownMenuItem disabled>
						<span>Empty</span>
					</DropdownMenuItem>
				) : (
					<DropdownMenuRadioGroup
						value={
							projectInvite
								? projectInvite.findIndex(
										({ project }) =>
											project.id ===
											(activeProject
												? activeProject.id
												: "null"),
								  )
								: "null"
						}
						onValueChange={(e) => {
							setActiveProject(projectInvite[e].project);
							localStorage.setItem(
								"activeProject",
								JSON.stringify(projectInvite[e].project),
							);
						}}
					>
						{projectInvite.map(({ project }, index) => {
							return (
								<DropdownMenuRadioItem
									key={"navbutton" + project.id}
									value={index}
								>
									{project.name}
								</DropdownMenuRadioItem>
							);
						})}
					</DropdownMenuRadioGroup>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
