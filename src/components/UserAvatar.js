import { Avatar } from "@mui/material";

export default function UserAvatar({ name, src }) {
	return <Avatar src={src}>{String(name)[0].toUpperCase()}</Avatar>;
}
