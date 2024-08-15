import { useState, useEffect } from "react"
import { copy, deleteSVG, linkIcon, loader, returnSvg, tick } from "../assets"

import { useLazyGetSummaryQuery } from "../services/summarizeAPI"

const Summary = () => {
	const [article, setArticle] = useState({ url: '', summary: '' })
	const [allArticles, setAllArticles] = useState([])
	const [copied, setCopied] = useState("")

	const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

	useEffect(() => {
		const articlesFromLocalStorage = JSON.parse(
			localStorage.getItem('articles')
		)
		if (articlesFromLocalStorage) setAllArticles(articlesFromLocalStorage)
	}, [])

	const handleSumbit = async (e) => {
		e.preventDefault();

		const existingArticle = allArticles.find(item => item.url === article.url)
		if (existingArticle) return setArticle(existingArticle)

		const { data } = await getSummary({ articleUrl: article.url })
		if (data?.summary) {
			const newArticle = { ...article, summary: data.summary }
			const updatedAllArticle = [newArticle, ...allArticles]
			setArticle(newArticle)
			setAllArticles(updatedAllArticle)
			localStorage.setItem('articles', JSON.stringify(updatedAllArticle))
		}
	}

	const handleCopy = (copyUrl) => {
		setCopied(copyUrl)
		navigator.clipboard.writeText(copyUrl)
		setTimeout(() => setCopied(false), 3000)
	}

	const handleDelete = (i) => {
		if (article.url === allArticles[i].url) setArticle({ url: '', summary: '' })
		const updatedAllArticles = allArticles.filter((item, index) => index !== i)
		setAllArticles(updatedAllArticles)
		localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
	}

	return (
		<div className="w-full mt-16 my-5 flex flex-col items-stretch selection:bg-secondaryColor overflow-y-scroll no-scrollbar">

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
					className="flex-1 text-black-700 placeholder:text-white-700 outline-none bg-transparent peer"
				/>
				<button type="submit" className="px-4 py-3 border border-transparent rounded-md transition-all peer-focus:border-white-700">
					<img src={returnSvg} alt="↩" className="w-4" />
				</button>
			</form>

			{/* Article Link */}
			<div className="w-full mt-5 flex flex-col gap-3 items-stretch">
				{
					allArticles.slice(0, 5).map((article, i) => (
						<div
							key={i}
							className="px-4 py-2 flex gap-4 items-center bg-white rounded-lg cursor-pointer"
						>
							<div
								className="w-max p-2.5 bg-white-500 rounded-full cursor-pointer"
								onClick={() => { handleCopy(article.url) }}
							>
								<img
									src={copied === article.url ? tick : copy}
									alt={copied === article.url ? 'tick' : 'copy'}
									className="w-3.5"
								/>
							</div>
							<p
								className="flex-1 text-blue-500 truncate"
								onClick={() => { setArticle(article) }}
							>
								{article.url}</p>
							<div
								className="w-max p-2.5 cursor-pointer"
								onClick={() => { handleDelete(i) }}
							>
								<img
									src={deleteSVG}
									alt='delete'
									className="w-3.5"
								/>
							</div>
						</div>
					))
				}
			</div>

			{/* Summary */}
			{
				isFetching ? (
					<div className="w-full flex justify-center p-10" >
						<img src={loader} alt='Loading...' className="w-14" />
					</div>
				) : (
					article.summary ? (
						<div className="w-full py-5 mt-5 flex flex-col items-center gap-3">
							<h2 className="w-full text-2xl font-bold text-left">Article <span className="text-secondaryAccentColor">Summary</span></h2>
							<p className="w-full text-justify px-3">{article.summary}</p>
						</div>
					) : error && (
						<div className="w-full py-5 mt-5 flex flex-col items-center gap-3">
							<h2 className="w-full text-2xl font-bold text-left">An error occured...</h2>
							<p className="w-full text-justify px-3">{error}</p>
						</div>
					)
				)
			}

		</div>
	)
}

export default Summary