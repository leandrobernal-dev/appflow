import NavButtons from "@/components/NavButtons";
import {
	Dashboard,
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
			type: "button",
			name: "Dashboard",
			icon: <Dashboard />,
			href: "/account/team",
		},
		{
			type: "group",
			name: "Project",
			href: "/account/project",
			buttons: [
				{
					name: "Kanban",
					icon: <ViewKanbanRounded />,
					href: "/kanban",
				},
				{
					name: "Settings",
					icon: <TuneRounded />,
					href: "/settings",
				},
				{
					name: "Project Activity",
					icon: <TrendingUpRounded />,
					href: "/activity",
				},
			],
		},
	];

	const SideLink = ({ href, className, ...rest }) => (
		<Link
			{...rest}
			href={href}
			onClick={() => setActiveNav(href)}
			className={`rounded-r-full p-3 text-sm  ${
				activeNav === href
					? "bg-accent-light font-bold text-text-dark"
					: ""
			} ${className}`}
		/>
	);
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

		const extractHrefs = (items) => {
			const hrefs = items
				.map((item) => {
					if (item.type === "group") {
						return item.buttons.map((btn) => item.href + btn.href);
					}
					return item.href;
				})
				.filter(Boolean);

			let flatArray = [];

			function flatten(hrefs) {
				for (let item of hrefs) {
					if (Array.isArray(item)) {
						flatten(item); // Recursively flatten nested arrays
					} else {
						flatArray.push(item); // Add scalar value to the result
					}
				}
			}

			flatten(hrefs);
			return flatArray;
		};
		const sidelinkArray = extractHrefs(sideBarButtons);

		const currentPath = pathname.split("/").filter(Boolean);
		currentPath.unshift("/");
		const paths = sidelinkArray.map((link) => {
			const targetPath = link.split("/").filter(Boolean);
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

		return sidelinkArray[active];
	};
	useEffect(() => setActiveNav(currentPath), [pathname]);
	const [activeNav, setActiveNav] = useState(currentPath);

	return (
		<aside className="bg-white fixed bottom-0 left-0 right-0 top-0 z-40 border-accent-light/10 py-4 pt-20 dark:border-accent-dark dark:bg-secondary-dark sm:block sm:w-56 sm:border-r ">
			<div className="flex items-center gap-4 sm:hidden">
				<NavButtons isMobile={true} />
			</div>
			<div className="flex flex-col gap-2 py-4 pr-2">
				{sideBarButtons.map((button, index) => {
					if (button.type === "group") {
						return (
							<div
								className="flex flex-col"
								key={button.name + index}
							>
								<h5 className="pointer-events-none select-none py-2 pl-4 text-sm font-semibold text-text-light/80">
									{button.name}
								</h5>
								{button.buttons.map((btn) => {
									const currHref = button.href + btn.href;
									return (
										<SideLink
											key={btn.name + index}
											href={currHref}
											className="pl-8"
										>
											{btn.icon} <span>{btn.name}</span>
										</SideLink>
									);
								})}
							</div>
						);
					}
					return (
						<SideLink
							key={button.name + index}
							href={button.href}
							className=""
						>
							{button.icon} <span>{button.name}</span>
						</SideLink>
					);
				})}
			</div>
		</aside>
	);
}
