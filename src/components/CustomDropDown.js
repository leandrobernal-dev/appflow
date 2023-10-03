export default function CustomDropDown({ id, children }) {
	return (
		<div
			className="shadow-shadow-light z-10 hidden  w-52 divide-y divide-gray-100 rounded-lg border border-accent-light/20 bg-white shadow-lg"
			id={id}
		>
			{children}
		</div>
	);
}
