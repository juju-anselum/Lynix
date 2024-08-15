import { useState, useEffect } from "react"
import { linkIcon, returnSvg } from "../assets"

const Summary = () => {
	const [article, setArticle] = useState({ url: '', summary: '' })


	const handleSumbit = (e) => {
		e.preventDefault();
		console.log(article)
	}


	return (
		<div className="w-full mt-16 my-5 flex flex-col items-stretch selection:bg-secondaryColor">

			{/* Form */}
			<form
				onSubmit={handleSumbit}
				className="w-full flex gap-4 bg-white px-4 py-1 rounded-lg shadow-xl"
			>
				<img src={linkIcon} alt="link_icon" />
				<input
					type="url"
					placeholder="Paste the article link"
					value={article.url}
					onChange={(e) => setArticle({ ...article, url: e.target.value })}
					required
					className="flex-1 placeholder:text-white-700 outline-none bg-transparent peer"
				/>
				<button type="submit" className="px-4 py-3 border border-transparent rounded-md transition-all peer-focus:border-white-700">
					<img src={returnSvg} alt="↩" className="w-4" />
				</button>
			</form>

		</div>
	)
}

export default Summary