import NavButtons from "@/components/NavButtons";
import { MenuRounded } from "@mui/icons-material";
import Link from "next/link";

export default function NavBar() {
	return (
		<nav className="bg-primary-background-light shadow-shadow-light fixed left-0 right-0 top-0 z-40 flex h-20 justify-between border-b border-accent-light/20 p-4 shadow-md	">
			<Link href="/account">
				<img src="/logo.svg" className="h-full" alt="AppFlow logo" />
			</Link>

			<div className="flex items-center sm:hidden">
				<button className="rounded-lg bg-secondary-light p-2 ">
					<MenuRounded />
				</button>
			</div>
			<div className="hidden items-center justify-between gap-4 sm:flex">
				<NavButtons isMobile={false} />
			</div>
		</nav>
	);
}
