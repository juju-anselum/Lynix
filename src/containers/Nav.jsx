import { logo } from '../assets'
import { PrimaryButton } from '../components'

const Nav = () => {
	return (
		<div className='w-full py-4 flex items-center justify-between'>
			<img src={logo} alt="Snapify" className='w-32 object-contain cursor-pointer' />
			{/* <PrimaryButton text={'Login'} onClick={() => { }} /> */}
		</div>
	)
}

export default Nav