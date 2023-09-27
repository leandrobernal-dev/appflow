import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "AppFlow",
	description: "Project Management tool for App/WebApp Developers",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="">
			<body
				suppressHydrationWarning={true}
				className={`${inter.className} h-screen w-screen bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark`}
			>
				<div className="h-full w-full">{children}</div>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
			</body>
		</html>
	);
}
