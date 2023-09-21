import NavButtons from "@/components/NavButtons";
import {
	TrendingUpRounded,
	TuneRounded,
	ViewKanbanRounded,
	WorkspacesRounded,
} from "@mui/icons-material";

export default function Sidebar() {
	const sideBarButtons = [
		{
			name: "Teams",
			icon: <WorkspacesRounded />,
			active: true,
		},
		{
			name: "Kanban",
			icon: <ViewKanbanRounded />,
		},
		{
			name: "Settings",
			icon: <TuneRounded />,
		},
		{
			name: "Project Activity",
			icon: <TrendingUpRounded />,
		},
	];
	return (
		<aside className="fixed bottom-0 left-0 right-0 top-0 z-40 border-accent-light bg-text-dark p-4 pt-24 dark:border-accent-dark dark:bg-secondary-dark sm:block sm:w-48 sm:border-r sm:bg-secondary-light">
			<div className="flex items-center gap-4 sm:hidden">
				<NavButtons isMobile={true} />
			</div>
			<div className="flex flex-col gap-6 py-4">
				{sideBarButtons.map((button, index) => {
					return (
						<button
							key={button.name + index}
							className={`flex w-full items-center gap-2 rounded-lg text-text-light dark:text-text-dark ${
								button.active ? "font-black" : "font-medium"
							}`}
						>
							{button.icon} <span>{button.name}</span>
						</button>
					);
				})}
			</div>
		</aside>
	);
}
