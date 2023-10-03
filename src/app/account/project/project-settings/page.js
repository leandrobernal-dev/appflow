"use client";

import { UserDataContext } from "@/context/UserDataContext";
import axios from "axios";
import { initFlowbite } from "flowbite";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function SettingsPage() {
	useEffect(() => initFlowbite(), []);
	const { activeProject, setActiveProject } = useContext(UserDataContext);
	const router = useRouter();
	function handleProjectDelete(e) {
		console.log(e);
		axios.delete("/api/project?id=" + activeProject.id).then((data) => {
			setActiveProject("");
			localStorage.removeItem("activeProject");
			router.push("/account");
		});
	}
	return (
		<div>
			<button
				className="rounded-lg bg-red-700 p-2 font-bold text-text-dark"
				data-modal-target="delete-project-popup-modal"
				data-modal-toggle="delete-project-popup-modal"
			>
				Delete Project
			</button>

			<div
				id="delete-project-popup-modal"
				tabIndex="-1"
				className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
			>
				<div className="relative max-h-full w-full max-w-md">
					<div className="relative rounded-lg bg-white shadow">
						<button
							type="button"
							className="absolute right-2.5 top-3 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-hide="delete-project-popup-modal"
						>
							<svg
								className="h-3 w-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
						<div className="p-6 text-center">
							<svg
								className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
								Are you sure you want to delete this project?
							</h3>
							<button
								data-modal-hide="delete-project-popup-modal"
								onClick={handleProjectDelete}
								className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
							>
								Yes, I'm sure
							</button>
							<button
								data-modal-hide="delete-project-popup-modal"
								type="button"
								className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
							>
								No, cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
