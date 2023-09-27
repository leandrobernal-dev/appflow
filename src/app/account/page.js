"use client";

import ProjectInviteModal from "@/components/ProjectInviteModal";
import { UserDataContext } from "@/context/UserDataContext";
import {
	AddCircleRounded,
	NotificationsRounded,
	PushPinRounded,
	ShareRounded,
} from "@mui/icons-material";
import { initFlowbite } from "flowbite";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function AccountPage() {
	useEffect(() => initFlowbite(), []);
	const router = useRouter();
	const { teams } = useContext(UserDataContext);
	useEffect(() => console.log(teams), [teams]);

	const teamElements = teams
		? teams.map((team) => {
				return (
					<button
						key={"team" + team.id}
						onClick={() => router.push("/account/" + team.id)}
						className="w-full max-w-xs rounded-lg border border-primary/50 bg-secondary-light p-2 text-start shadow-lg"
					>
						<div className="flex flex-col gap-1">
							<span className="flex justify-between">
								<h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
									{team.name}
								</h5>
								<span className="flex items-center gap-1">
									<span>
										<NotificationsRounded />
									</span>
									<button
										className="rotate-45"
										onClick={(e) => {
											e.stopPropagation();
											// TODO: add pin team feature
										}}
									>
										<PushPinRounded />
									</button>
								</span>
							</span>
							<p className=" text-sm font-normal text-gray-700 dark:text-gray-400">
								{team.description}
							</p>
						</div>
						<div className="pt-4">
							{team.teammembers.map(({ user }) => {
								return (
									<button
										onClick={(e) => {
											e.stopPropagation();
											console.log(user);
										}}
										key={"team" + team.id + user.id}
									>
										<img
											className="h-10 w-10 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
											src={
												user.profile
													? "/docs/images/people/profile-picture-5.jpg"
													: "/avatar.svg"
											}
											alt="profile"
											data-tooltip-target={
												"avatar" + user.id
											}
										/>

										<div
											id={"avatar" + user.id}
											role="tooltip"
											className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
										>
											{user.name} -{" "}
											{user.role
												? user.role
												: "NO SPECIFIED TEAM-ROLE"}
										</div>
									</button>
								);
							})}
						</div>
					</button>
				);
		  })
		: "You Haven't created Teams yet";
	return (
		<div>
			<div className="flex justify-between">
				<h1 className="text-2xl font-black">
					<span>
						Project Teams: <span>{teams.length}</span>
					</span>
				</h1>
				<div className="flex gap-2">
					<button
						onClick={() => router.push("/account/create-team")}
						className="rounded-lg bg-accent-light p-2 text-text-dark"
					>
						<AddCircleRounded />
						<span>Create Team</span>
					</button>
					<button
						data-modal-target="project-invite-popup-modal"
						data-modal-toggle="project-invite-popup-modal"
						className="rounded-lg bg-accent-light p-2 text-text-dark"
					>
						<ShareRounded />
						<span>Invite</span>
					</button>
					<ProjectInviteModal />
				</div>
			</div>
			<div className="item-center flex justify-center">
				{teamElements}
			</div>
		</div>
	);
}
