import "./globals.css";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
	title: "AppFlow",
	description: "Project Management tool for App/WebApp Developers",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="">
			<body
				suppressHydrationWarning={true}
				className={`${poppins.className} bg-secondary-background-light h-screen  w-screen text-text-light dark:text-text-dark`}
			>
				<div className="h-full w-full">{children}</div>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
			</body>
		</html>
	);
}
