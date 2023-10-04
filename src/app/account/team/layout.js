"use client";

import { Button } from "@/components/ui/button";
import { UserDataContext } from "@/context/UserDataContext";
import {
	AddCircleRounded,
	GroupsRounded,
	PushPinRounded,
	SearchRounded,
} from "@mui/icons-material";
import { MoreVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function TeamLayout({ children }) {
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
			<div className="bg-white absolute bottom-0 left-0 top-0 flex w-72 flex-col gap-4 border-r border-accent-light/10 p-2 py-4 shadow-sm shadow-shadow-light">
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
							className={`text-white flex-1 rounded-md px-2 py-1 text-center ${
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
					<button className="text-white flex items-center justify-between gap-2 rounded-lg bg-text-light p-2 text-sm">
						<AddCircleRounded />
						<span>New Message</span>
					</button>
				</div>
				<div className="flex w-full flex-col gap-4">
					{teams.map((team) => {
						return (
							<div
								key={"team" + team.id}
								className={`border-transparent relative rounded-md border ${
									activeTeam === team.id
										? "border-accent-light/20 shadow-sm shadow-shadow-light/30"
										: ""
								}`}
							>
								<Link
									href={"/account/team/" + team.id}
									className=" flex h-full w-full items-center gap-2  px-2 py-4"
								>
									<span className="text-white flex items-center rounded-full bg-text-light p-2">
										<GroupsRounded />
									</span>
									<div className="relative flex-1">
										<h3 className="font-bold">
											{team.name}
										</h3>
									</div>
								</Link>

								<Button
									className="absolute right-0 top-0"
									variant="link"
									size="sm"
								>
									<MoreVertical className="h-4 w-4" />
								</Button>
							</div>
						);
					})}
				</div>
			</div>
			{children}
		</div>
	);
}
