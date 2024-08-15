import { logoImg } from "../assets"

const Header = () => {
	return (
		<div className="w-full flex flex-col gap-4 items-center">
			<img src={logoImg} alt="Snapify" className="w-16" />
			<h1 className="text-3xl md:text-4xl font-extrabold text-center leading-snug">Enhance you Reading with <br /> <span className="gradient_text">Snapify GPT-4</span></h1>
			<p className="text-sm md:text-base text-black-500 text-center leading-snug">Streamline your reading with Snapify—an innovative, open-source tool that converts extensive articles into precise summaries.</p>
		</div>
	)
}

export default Header