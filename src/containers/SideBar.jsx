import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newChatSvg, logo, deleteSvg } from '../assets'
import { createNewArticle, deleteArticle, setAllArticles, setCurrentArticle } from '../services/slices/articles'
import UserStatus from './UserStatus'
import { auth, db } from '../services/auth/firebaseApi'
import { doc, getDoc, setDoc } from 'firebase/firestore'

const SideBar = () => {

	const dispatch = useDispatch();
	const allArticles = useSelector((state) => state.articles.allArticles);
	const currentArticle = useSelector((state) => state.articles.currentArticle);

	const fetchArticles = async () => {
		auth.onAuthStateChanged(async (user) => {
			if (!user) {
				setAllArticles([]);
			} else {
				try {
					const crntUser = auth.currentUser;
					const docRef = doc(db, "articles", crntUser.uid);
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						dispatch(setAllArticles(docSnap.data().articles || []))
					} else {
						console.log('No such document!');
					}
				} catch (error) {
					console.error('Error fetching articles:', error);
				}
			}
		});
	};


	const updateFirestore = async () => {
		if (auth.currentUser && allArticles.length > 0) {
			const user = auth.currentUser;
			try {
				const docRef = doc(db, 'articles', user.uid);
				await setDoc(docRef, { 'articles': allArticles });
			} catch (error) {
				console.log(error);
			}
		}
	}

	useEffect(() => {
		updateFirestore();
	}, [allArticles]);

	useEffect(() => {
		fetchArticles();
	}, []);

	return (
		<div className='w-full h-full p-4 py-6 flex flex-col items-stretch justify-start gap-8 rounded-r-2xl bg-[rgba(30,30,30,0.08)] backdrop-blur-lg'>
			<div className="w-full flex gap-2 items-center cursor-pointer group" onClick={() => { dispatch(createNewArticle()) }} >
				<img src={logo} alt="logo" className='w-8' />
				<p className="text-xl font-medium flex-1">Lynix</p>
			</div>
			<div className="w-full py-1 flex items-center justify-between cursor-pointer" onClick={() => { dispatch(createNewArticle()) }} >
				<p className="text-md lg:text-lg font-medium">New Article</p>
				<img src={newChatSvg} alt="newChatSvg" className='w-6' />
			</div>

			<div className="w-full flex-1 flex flex-col items-stretch justify-start gap-3 overflow-y-scroll no-scrollbar">
				{allArticles.length > 0 && <p className="text-md lg:text-lg  font-medium">All Articles</p>}
				{allArticles?.map((article, i) => (
					<div
						key={i}
						className={`w-full px-1 flex justify-between items-center rounded-md cursor-pointer group hover:bg-[rgba(30,30,30,0.08)] ${currentArticle[0]?.url === article.url ? 'bg-[rgba(30,30,30,0.12)]' : 'bg-transparent'}`}
						onClick={() => { dispatch(setCurrentArticle(article)) }}
					>
						<p className='w-[70%] flex-1 text-base lg:text-lg p-2 overflow-clip whitespace-nowrap'>{article?.title ? article.title : article.url}</p>
						<img src={deleteSvg} alt="🗑️" className='w-8 xl:w-0 p-2 ml-2 rounded-full [rgba(30,30,30,0.08)] group-hover:w-8 hover:scale-125 transition-scale' onClick={() => { dispatch(deleteArticle(article.url)) }} />
					</div>
				))}
			</div>

			<UserStatus />
		</div>
	);

}

export default SideBar