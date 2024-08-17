import { useEffect } from 'react'
import { newChatSvg, logo } from '../assets'
import { PrimaryButton } from '../components'

import { createNewArticle, fetchArticles, setCurrentArticle } from '../services/articles'
import { useSelector, useDispatch } from 'react-redux'

const SideBar = () => {

	const dispatch = useDispatch();
	const allArticles = useSelector((state) => state.articles.allArticles);
	const currentArticle = useSelector((state) => state.articles.currentArticle);

	useEffect(() => {
		dispatch(fetchArticles());
	}, [dispatch]);

	return (
		<div className='w-full h-full p-4 py-6 flex flex-col items-stretch justify-start gap-8 rounded-r-2xl bg-[rgba(30,30,30,0.08)] backdrop-blur-lg'>

			<div className="w-full flex gap-2 items-center cursor-pointer group" onClick={() => { dispatch(createNewArticle()) }} >
				<img src={logo} alt="logo" className='w-8' onClick={() => { alert('Logo') }} />
				<p className="text-xl font-medium flex-1">Lynix</p>
			</div>

			<div className="w-full py-1 flex items-center justify-between cursor-pointer" onClick={() => { dispatch(createNewArticle()) }} >
				<p className="text-md lg:text-lg font-medium">New Article</p>
				<img src={newChatSvg} alt="newChatSvg" className='w-6' />
			</div>

			<div className="w-full flex-1 flex flex-col items-stretch justify-start gap-3">
				<p className="text-md lg:text-lg  font-medium">All Articles</p>
				{
					allArticles?.map((article, i) => {
						return (
							<div
								key={i}
								className={`w-full px-1 overflow-clip whitespace-nowrap rounded-md cursor-pointer hover:bg-[rgba(30,30,30,0.08)] ${currentArticle[0]?.url === article.url ? 'bg-[rgba(30,30,30,0.12)]' : 'bg-transparent'}`}
								onClick={() => dispatch(setCurrentArticle(article.url))}
							>
								<p className='text-base lg:text-lg p-2'>{article?.title ? article.title : article.url}</p>
							</div>
						)
					})
				}
			</div>

			<div className="w-full">
				<PrimaryButton text='Login' />
			</div>

		</div>
	)

}

export default SideBar