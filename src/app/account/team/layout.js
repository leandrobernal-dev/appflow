"use client";

import ProjectInviteModal from "@/components/ProjectInviteModal";
import UserAvatar from "@/components/UserAvatar";
import { UserDataContext } from "@/context/UserDataContext";
import {
	AddCircleRounded,
	CalendarMonthRounded,
	GroupsRounded,
	NotificationsRounded,
	PushPinRounded,
	SearchRounded,
	ShareRounded,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { initFlowbite } from "flowbite";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function TeamLayout({ children }) {
	useEffect(() => initFlowbite(), []);
	const pathname = usePathname();
	const { teams, projectMembers, user, setUser, activeProject } =
		useContext(UserDataContext);
	const { data: session, status } = useSession({ required: true });
	useEffect(() => {
		if (status !== "authenticated") return;
		setUser(session.user);
	}, [status]);
	// useEffect(() => console.log(teams), [teams]);

	const currentPath = () => {
		if (teams.length === 0) return "";
		return pathname.split("/")[3];
	};
	const [activeTeam, setActiveTeam] = useState("");
	useEffect(() => setActiveTeam(currentPath), [pathname, teams]);

	return (
		<div className="relative h-full pl-72">
			<div className="shadow-shadow-light absolute bottom-0 left-0 top-0 flex w-72 flex-col gap-4 border-r border-accent-light/10 bg-white p-2 py-4 shadow-sm">
				<form className="relative flex items-center">
					<button className="absolute px-2">
						<SearchRounded />
					</button>
					<input
						type="search"
						className="w-full rounded-md border-accent-light/10 pl-8 text-sm"
						placeholder="Find Contacts"
					/>
				</form>
				<div className="flex w-full items-center justify-between gap-1 text-sm">
					{["All", "Users", "Teams"].map((filter) => (
						<button
							className={`flex-1 rounded-md px-2 py-1 text-center text-white ${
								filter === "All"
									? "bg-secondary-light"
									: "bg-gray-500 "
							}`}
							key={filter}
						>
							{filter}
						</button>
					))}
				</div>
				<div>
					<button className="flex items-center justify-between gap-2 rounded-lg bg-text-light p-2 text-sm text-white">
						<AddCircleRounded />
						<span>New Message</span>
					</button>
				</div>
				<div className="flex w-full flex-col gap-4">
					{teams.map((team) => {
						return (
							<Link
								href={"/account/team/" + team.id}
								key={"team" + team.id}
								className={`flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-4 ${
									activeTeam === team.id
										? "shadow-shadow-light/30 border-accent-light/20 shadow-sm"
										: ""
								}`}
							>
								<span className="flex items-center rounded-full bg-text-light p-2 text-white">
									<GroupsRounded />
								</span>
								<div className="relative flex-1">
									<h3 className="font-bold">{team.name}</h3>
									<span className="absolute right-0 top-0">
										<button className="rotate-45">
											<PushPinRounded fontSize="small" />
										</button>
									</span>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
			{children}
		</div>
	);
}
