import {
	AccountCircleRounded,
	ArrowDropDownOutlined,
	DarkModeOutlined,
	NotificationsRounded,
} from "@mui/icons-material";

export default function NavBar() {
	return (
		<nav className="fixed left-0 right-0 top-0 flex h-20 justify-between border-b border-accent-light p-4 dark:border-accent-dark">
			<a href="/account">
				<img src="/logo.svg" className="h-full" alt="AppFlow logo" />
			</a>

			<div className="flex items-center justify-between gap-2">
				<button className="rounded-lg bg-secondary-light p-2 ">
					<NotificationsRounded />
				</button>
				<button className="rounded-lg bg-primary p-2 text-text-dark dark:text-text-light">
					<span>Select Project</span>
					<ArrowDropDownOutlined />
				</button>
				<button className="rounded-lg bg-secondary-dark p-2 text-text-dark dark:bg-secondary-light">
					<DarkModeOutlined />
				</button>
				<button className="rounded-lg bg-secondary-light p-2">
					<AccountCircleRounded />
				</button>
			</div>
		</nav>
	);
}
