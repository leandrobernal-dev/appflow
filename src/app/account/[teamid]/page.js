"use client";

import { UserDataContext } from "@/context/UserDataContext";
import { useContext } from "react";

export default function TeamDetails({ params }) {
	const { teams } = useContext(UserDataContext);
	const team = teams.find((item) => item.id === params.teamid);
	const teamElements = teams
		? teams.map((team) => {
				return (
					<div key={"team" + team.id}>
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
					</div>
				);
		  })
		: "You Haven't created Teams yet";

	return (
		<div>
			{/* <h1>{teams[0].name}</h1> */}
			{teamElements}
			<div>{params.teamid}</div>
		</div>
	);
}
