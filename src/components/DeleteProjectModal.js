import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { UserDataContext } from "@/context/UserDataContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function DeletProjectModal() {
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
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">Delete Project</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete this project?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete this project and remove project teams and members
						associated with this project.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button asChild variant="destructive">
						<AlertDialogAction onClick={handleProjectDelete}>
							Continue
						</AlertDialogAction>
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
