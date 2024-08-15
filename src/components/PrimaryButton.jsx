const PrimaryButton = ({ text, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="rounded-lg text-lg text-white-500 py-2 px-6 bg-black-700 transition-all hover:bg-black-500 cursor-pointer"
		>
			{text}
		</button>
	)
}

export default PrimaryButton