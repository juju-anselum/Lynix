const PrimaryButton = ({ text, icon, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="w-full py-3 px-6 flex items-center justify-center gap-8 text-lg text-white-500 bg-black-700 rounded-lg transition-all hover:bg-black-500 cursor-pointer select-none"
		>
			{icon &&
				<img src={icon} alt="Icon" className="w-6" />
			}
			{text}
		</button>
	)
}

export default PrimaryButton