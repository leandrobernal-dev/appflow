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
				className={`${inter.className} bg-background-light dark:bg-background-dark`}
			>
				{children}
			</body>
		</html>
	);
}
