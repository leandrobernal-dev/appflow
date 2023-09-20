import NavBar from "@/layout/NavBar";
import Sidebar from "@/layout/SideBar";

export default function AccountLayout({ children }) {
	return (
		<main className="">
			<Sidebar />
			<NavBar />
			{children}
		</main>
	);
}
