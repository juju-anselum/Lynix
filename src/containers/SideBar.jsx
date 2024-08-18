import { useEffect, useRef } from 'react'
import { newChatSvg, logo, deleteSvg } from '../assets'
import { PrimaryButton } from '../components'
import { useNavigate } from 'react-router-dom'

import { createNewArticle, deleteArticle, fetchArticles, setCurrentArticle } from '../services/slices/articles'
import { useSelector, useDispatch } from 'react-redux'

const SideBar = ({ onMenuClick, isNav }) => {
	const navigate = useNavigate()
	const sideBarRef = useRef()

	const dispatch = useDispatch();
	const allArticles = useSelector((state) => state.articles.allArticles);
	const currentArticle = useSelector((state) => state.articles.currentArticle);

	useEffect(() => {
		dispatch(fetchArticles());
	}, [dispatch]);

	useEffect(() => {
		document.addEventListener('mousedown', (event) => {
			if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
				if (isNav)
					onMenuClick()
			}
		})
		return () => {
			document.removeEventListener('mousedown', (event) => {
				if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
					if (isNav)
						onMenuClick()
				}
			})
		}
	}, [])

	return (
		<div className='w-full h-full p-4 py-6 flex flex-col items-stretch justify-start gap-8 rounded-r-2xl bg-[rgba(30,30,30,0.08)] backdrop-blur-lg' ref={sideBarRef}>

			<div className="w-full flex gap-2 items-center cursor-pointer group" onClick={() => { dispatch(createNewArticle()) }} >
				<img src={logo} alt="logo" className='w-8' onClick={() => { alert('Logo') }} />
				<p className="text-xl font-medium flex-1">Lynix</p>
			</div>

			<div className="w-full py-1 flex items-center justify-between cursor-pointer" onClick={() => { dispatch(createNewArticle()) }} >
				<p className="text-md lg:text-lg font-medium">New Article</p>
				<img src={newChatSvg} alt="newChatSvg" className='w-6' />
			</div>

			<div className="w-full flex-1 flex flex-col items-stretch justify-start gap-3 overflow-y-scroll no-scrollbar">
				<p className="text-md lg:text-lg  font-medium">All Articles</p>
				{
					allArticles?.map((article, i) => {
						return (
							<div
								key={i}
								className={`w-full px-1 flex justify-between items-center rounded-md cursor-pointer group hover:bg-[rgba(30,30,30,0.08)] ${currentArticle[0]?.url === article.url ? 'bg-[rgba(30,30,30,0.12)]' : 'bg-transparent'}`}
								onClick={() => { dispatch(setCurrentArticle(article)) }}
							>
								<p className='w-[70%] flex-1 text-base lg:text-lg p-2 overflow-clip whitespace-nowrap'>{article?.title ? article.title : article.url}</p>
								<img src={deleteSvg} alt="🗑️" className='w-8 xl:w-0 p-2 ml-2 rounded-full [rgba(30,30,30,0.08)] group-hover:w-8 hover:scale-125 transition-scale' onClick={() => { dispatch(deleteArticle(article.url)) }} />
							</div>
						)
					})
				}
			</div>

			<div className="w-full">
				<PrimaryButton text='Login' onClick={() => { navigate('/login') }}/>
			</div>

		</div>
	)

}

export default SideBar