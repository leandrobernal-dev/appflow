import {
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext } from "react";
import { UserDataContext } from "@/context/UserDataContext";
import { signOut } from "next-auth/react";

export function ProfileDropdownMenu() {
	const { user } = useContext(UserDataContext);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="cursor-pointer">
					<AvatarImage src={""} alt="@shadcn" />
					<AvatarFallback className="bg-[#D95A5F] text-lg font-bold text-white">
						{user ? String(user.name)[0].toUpperCase() : ""}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						<span>Profile</span>
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard className="mr-2 h-4 w-4" />
						<span>Billing</span>
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => signOut()}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
