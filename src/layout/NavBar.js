import NavButtons from "@/components/NavButtons";
import { MenuRounded } from "@mui/icons-material";

export default function NavBar() {
	return (
		<nav className="fixed left-0 right-0 top-0 z-50 flex h-20 justify-between border-b border-accent-light p-4 dark:border-accent-dark">
			<a href="/account">
				<img src="/logo.svg" className="h-full" alt="AppFlow logo" />
			</a>

			<div className="flex items-center sm:hidden">
				<button className="rounded-lg bg-secondary-light p-2 ">
					<MenuRounded />
				</button>
			</div>
			<div className="hidden items-center justify-between gap-2 sm:flex">
				<NavButtons isMobile={false} />
			</div>
		</nav>
	);
}
