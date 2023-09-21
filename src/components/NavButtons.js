import CustomDropDown from "@/components/CustomDropDown";
import {
	AccountCircleRounded,
	AddCircleRounded,
	ArrowDropDownCircleOutlined,
	DarkModeOutlined,
	NotificationsRounded,
	PriorityHighRounded,
} from "@mui/icons-material";

export default function NavButtons() {
	return (
		<>
			<button className="rounded-lg bg-secondary-light p-2 ">
				<NotificationsRounded />
			</button>

			<button
				data-dropdown-toggle="project-select-dropdown"
				className="flex items-center justify-center gap-1 rounded-lg bg-primary p-2 text-text-dark dark:text-text-light"
			>
				<span>Select Project</span>
				<ArrowDropDownCircleOutlined />
			</button>
			<CustomDropDown id="project-select-dropdown">
				<div>
					<a
						href="/account/newproject"
						className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<AddCircleRounded /> <span>New Project</span>
					</a>
				</div>
				<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
					<li>
						<span className="pointer-events-none block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
							<PriorityHighRounded />{" "}
							<span>You Have no Projects</span>
						</span>
					</li>
				</ul>
			</CustomDropDown>

			<button className="rounded-lg bg-secondary-dark p-2 text-text-dark dark:bg-secondary-light">
				<DarkModeOutlined />
			</button>
			<button className="rounded-lg bg-secondary-light p-2">
				<AccountCircleRounded />
			</button>
		</>
	);
}
