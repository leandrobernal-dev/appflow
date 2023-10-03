"use client";

import { UserDataContext } from "@/context/UserDataContext";
import { SendRounded } from "@mui/icons-material";
import { useContext } from "react";

export default function TeamDetails({ params }) {
	const { teams } = useContext(UserDataContext);
	const team = teams.find((item) => item.id === params.teamid);
	return (
		<div className="flex h-full flex-col overflow-hidden p-2">
			<div className="pointer-events-none flex flex-1 select-none items-center justify-center text-lg">
				No Messages Yet. Say Hi to the Team!
			</div>
			<div className="relative h-20">
				<textarea
					className="max-h-16 w-full resize-none rounded-lg py-4 pr-10 text-sm"
					placeholder="Send a message"
				></textarea>
				<span className="absolute bottom-0 right-0 top-0 flex h-full items-center p-4 text-accent-light">
					<button className="-rotate-[20deg]">
						<SendRounded />
					</button>
				</span>
			</div>
		</div>
	);
}
