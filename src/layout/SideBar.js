import NavButtons from "@/components/NavButtons";
import {
	SettingsApplicationsRounded,
	TrendingUpRounded,
	TuneRounded,
	ViewKanbanRounded,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
	const pathname = usePathname();
	const sideBarButtons = [
		{
			name: "Project",
			icon: <SettingsApplicationsRounded />,
			href: "/account/",
			active: true,
		},
		{
			name: "Kanban",
			icon: <ViewKanbanRounded />,
			href: "/account/kanban",
		},
		{
			name: "Settings",
			icon: <TuneRounded />,
			href: "/account/project-settings",
		},
		{
			name: "Project Activity",
			icon: <TrendingUpRounded />,
			href: "/account/activity",
		},
	];
	const currentPath = () => {
		function calculateJaccardSimilarity(arr1, arr2) {
			const set1 = new Set(arr1);
			const set2 = new Set(arr2);
			const intersectionSize = new Set(
				[...set1].filter((item) => set2.has(item)),
			).size;
			const unionSize = new Set([...set1, ...set2]).size;
			return intersectionSize / unionSize;
		}

		const currentPath = pathname.split("/").filter(Boolean);
		currentPath.unshift("/");
		const paths = sideBarButtons.map((link) => {
			const targetPath = link.href.split("/").filter(Boolean);
			targetPath.unshift("/");
			return targetPath;
		});

		const active = paths
			.map((href, index) => ({
				index: index,
				similarity: calculateJaccardSimilarity(currentPath, href),
			}))
			.reduce((prev, current) =>
				current.similarity > prev.similarity ? current : prev,
			).index;
		return sideBarButtons[active].href;
	};
	useEffect(() => setActiveNav(currentPath), [pathname]);
	const [activeNav, setActiveNav] = useState(currentPath);

	return (
		<aside className="fixed bottom-0 left-0 right-0 top-0 z-40 border-accent-light bg-text-dark p-4 pt-24 dark:border-accent-dark dark:bg-secondary-dark sm:block sm:w-48 sm:border-r sm:bg-secondary-light">
			<div className="flex items-center gap-4 sm:hidden">
				<NavButtons isMobile={true} />
			</div>
			<div className="flex flex-col gap-6 py-4">
				{sideBarButtons.map((button, index) => {
					return (
						<Link
							key={button.name + index}
							href={button.href}
							onClick={() => setActiveNav(button.href)}
							className={`flex w-full items-center gap-2 rounded-lg text-text-light dark:text-text-dark ${
								activeNav === button.href
									? "font-black"
									: "font-medium"
							}`}
						>
							{button.icon} <span>{button.name}</span>
						</Link>
					);
				})}
			</div>
		</aside>
	);
}
