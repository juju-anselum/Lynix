import { useState } from 'react'
import { SideBar, Hero } from '../containers'

const Home = () => {
	const [isNav, setIsNav] = useState(false)

	const toggleNav = () => {
		setIsNav(!isNav);
	};

	return (
		<div className='w-full h-dvh max-h-dvh flex items-stretch justify-stretch'>
			{/* Mobile and Tablet */}
			<div className='w-[50%] lg:w-[30%] h-full absolute xl:hidden'>
				{isNav && <SideBar onMenuClick={toggleNav} />}
			</div>

			{/* Pc */}
			<div className={`w-2/12 max-w-[300px] h-full hidden xl:block`}>
				<SideBar onMenuClick={toggleNav} />
			</div>

			<div className='flex-1 h-full p-0 lg:p-4'>
				<Hero onMenuClick={toggleNav} />
			</div>
		</div>
	)
}

export default Home