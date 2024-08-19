import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetSummaryQuery } from "../services/slices/summarizeAPI";
import { addArticle, setCurrentArticle, updateError, updateIsSummarizing } from "../services/slices/articles";
import { returnSvg } from "../assets";
import { auth } from "../services/auth/firebaseApi";

const URLInput = () => {
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState('');
	const [GetSummary, { isFetching, error }] = useLazyGetSummaryQuery();

	const allArticles = useSelector((state) => state.articles.allArticles);
	const currentArticle = useSelector((state) => state.articles.currentArticle)?.summary ? true : false;


	const fetchTitle = async (url) => {
		try {
			const response = await fetch(url);
			const text = await response.text();
			const parser = new DOMParser();
			const doc = parser.parseFromString(text, 'text/html');
			console.log('text: ', text)
			const title = doc.querySelector('title').textContent;
			if (title) return title
		} catch (e) {
			console.log(e);
		}
		const hostname = new URL(url).hostname;
		const websiteName = hostname.split('.')[1];
		return websiteName ? websiteName : hostname;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const articleExists = allArticles.some((article) => article.url === searchValue);

		if (articleExists) {
			const existingArticle = allArticles.find((article) => article.url === searchValue);
			dispatch(setCurrentArticle(existingArticle));
		} else {
			try {
				const result = await GetSummary({ articleUrl: searchValue }).unwrap();
				let title = await fetchTitle(searchValue);
				title = title.charAt(0).toUpperCase() + title.slice(1);
				let article = { title: title, url: searchValue, summary: result?.summary };
				dispatch(addArticle(article));
			} catch (err) {
				console.error('Failed to fetch summary:', err);
			}
		}

		setSearchValue('');
	};


	useEffect(() => {
		dispatch(updateIsSummarizing(isFetching))
	}, [isFetching, dispatch])

	useEffect(() => {
		dispatch(updateError(error))
	}, [error, dispatch])

	return (
		<div className="w-full flex flex-col gap-4 items-center">
			<form
				onSubmit={handleSubmit}
				className="w-full flex gap-4 bg-white px-4 py-1 rounded-lg shadow-xl"
			>
				<input
					type="url"
					placeholder={currentArticle ? 'Interactive conversation support arriving soon' : 'Paste the article link'}
					value={currentArticle ? '' : searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
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
			{
				auth.currentUser ? null :
					<p className="text-xs md:text-sm font-medium text-[#777777] text-center">Login to save data and sync across devices</p>
			}
		</div>
	);
};

export default URLInput;
