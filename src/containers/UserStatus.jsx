import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../services/auth/firebaseApi"
import { PrimaryButton, SecondaryButton } from "../components"
import { toast } from "react-toastify"
import { setAllArticles } from "../services/slices/articles"
import { useDispatch } from "react-redux"

const UserStatus = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const checkUserLoggedIn = () => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true)
			} else {
				setIsLoggedIn(false)
			}
		})
	}

	useEffect(() => {
		checkUserLoggedIn()
	})

	return (
		<div className="w-full">
			{isLoggedIn ? (
				<SecondaryButton text='Logout' onClick={() => { auth.signOut(); dispatch(setAllArticles([])); toast.success('Logged Out') }} />
			) : (
				<PrimaryButton text='Login' onClick={() => { navigate('/login') }} />
			)
			}
		</div>
	)
}

export default UserStatus