const PrimaryButton = ({ text, icon, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="w-full py-3 px-6 flex items-center justify-center gap-8 text-lg text-black font-medium bg-white rounded-lg border border-neutral-400 transition-all hover:brightness-95 cursor-pointer select-none"
		>
			{icon &&
				<img src={icon} alt="Icon" className="w-6" />
			}
			{text}
		</button>
	)
}

export default PrimaryButton