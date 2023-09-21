export default function CustomDropDown({ id, children }) {
	return (
		<div
			className="z-10 hidden w-52  divide-y divide-gray-100 rounded-lg bg-secondary-light shadow"
			id={id}
		>
			{children}
		</div>
	);
}
