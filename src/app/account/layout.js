"use client";

import NavBar from "@/layout/NavBar";
import Sidebar from "@/layout/SideBar";

export default function AccountLayout({ children }) {
	return (
		<main className="pt-20 sm:pl-48 ">
			<Sidebar />
			<NavBar />

			{children}
		</main>
	);
}
