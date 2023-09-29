"use client";

import ProjectInviteModal from "@/components/ProjectInviteModal";
import { UserDataContext } from "@/context/UserDataContext";
import {
	AddCircleRounded,
	CalendarMonthRounded,
	NotificationsRounded,
	PushPinRounded,
	ShareRounded,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { initFlowbite } from "flowbite";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function AccountPage() {
	useEffect(() => initFlowbite(), []);
	const { teams, projectMembers, user, setUser, activeProject } =
		useContext(UserDataContext);
	const { data: session, status } = useSession({ required: true });
	useEffect(() => console.log(teams), [teams]);

	const teamElements = teams
		? teams.map((team) => {
				return (
					<Link
						href={"/account/team/" + team.id}
						key={"team" + team.id}
						className="w-full max-w-sm rounded-lg border border-primary/50 bg-secondary-light p-2 text-start shadow-lg"
					>
						<div className="flex flex-col gap-4">
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
							<span>
								<div className=" flex justify-between text-base font-medium dark:text-white">
									<span>Progress</span> <span>45%</span>
								</div>
								<div className="mb-4 h-1.5 w-full rounded-full bg-gray-200">
									<div
										className={`h-1.5 rounded-full bg-text-light ${"w-[45%]"}`} // TODO: add to dos progress here
									></div>
								</div>
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="rounded-full bg-primary p-2 text-sm text-text-dark">
								{new Date(team.createdAt).toLocaleDateString(
									"en-US",
									{
										month: "short",
										day: "numeric",
										year: "numeric",
									},
								)}
							</span>
							<div>
								{team.teammembers.map(({ user }) => {
									return (
										<Avatar
											key={"team" + team.id + user.id}
											src={user.profile}
										>
											{String(user.name)[0].toUpperCase()}
										</Avatar>
									);
								})}
							</div>
						</div>
					</Link>
				);
		  })
		: "You Haven't created Teams yet";
	return (
		<div className="flex flex-col gap-8 px-4">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-black">
						Welcome,{" "}
						{status === "authenticated"
							? session.user.name.split(" ")[0]
							: ""}
					</h1>
					<p className="text-sm text-primary">
						Check out latest project updates
					</p>
				</div>
				<div className="flex items-center justify-between gap-1 rounded-lg border-2 border-background-dark/50 p-3 font-bold">
					<span>
						<CalendarMonthRounded />
					</span>
					<span>
						{activeProject
							? new Date(
									activeProject.createdAt,
							  ).toLocaleDateString("en-US", {
									month: "short",
									day: "2-digit",
									year: "numeric",
							  })
							: ""}
					</span>
				</div>
			</div>

			<div className="item-center flex">{teamElements}</div>
			{/* <div className="w-full py-4">
				<div className="flex w-full justify-center gap-2">
					{projectMembers.map(({ user }) => {
						return (
							<div className="flex flex-col items-center justify-center gap-1">
								<img
									className="h-10 w-10 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500"
									src={
										user.profile
											? "/docs/images/people/profile-picture-5.jpg"
											: "/avatar.svg"
									}
									alt="profile"
								/>
								<span className="text-xs">{user.name}</span>
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex justify-between">
				<h1 className="text-2xl font-black">
					<span>
						Project Teams: <span>{teams.length}</span>
					</span>
				</h1>
				<div className={`flex gap-2`}>
					<Link
						href={"/account/create-team"}
						className="rounded-lg bg-accent-light p-2 text-text-dark"
					>
						<AddCircleRounded />
						<span>Create Team</span>
					</Link>
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
			</div> */}
		</div>
	);
}
