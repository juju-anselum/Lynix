import { useSelector } from "react-redux"
import { returnSvg } from "../assets"

const URLInput = () => {

	const currentArticle = useSelector((state) => state.articles.currentArticle)[0]?.summary ? true : false;

	return (
		<div className="w-full flex flex-col gap-4 items-center">
			<form
				onSubmit={() => { }}
				className="w-full flex gap-4 bg-white px-4 py-1 rounded-lg shadow-xl"
			>
				<input
					type="url"
					placeholder={currentArticle ? 'Interactive conversation support arriving soon' : 'Paste the article link'}
					value={''}
					onChange={() => { }}
					required
					disabled={currentArticle}
					className={`flex-1 text-black-700 placeholder:text-white-700 outline-none bg-transparent peer ${currentArticle ? 'cursor-not-allowed' : 'cursor-text'}`}
				/>
				<button
					type="submit"
					className="px-4 py-3 border border-transparent rounded-md transition-all peer-focus:border-white-700"
					disabled={currentArticle}
				>
					<img src={returnSvg} alt="↩" className="w-4" />
				</button>
			</form>
			<p className="text-xs md:text-sm font-medium text-black-500 text-center">Login to save data and sync across devices</p>
		</div>
	)
}

export default URLInput