import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../services/auth/firebaseApi"
import { PrimaryButton } from "../components"
import { toast } from "react-toastify"

const UserStatus = () => {
	const navigate = useNavigate()
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
				<PrimaryButton text='Logout' onClick={() => { auth.signOut(); toast.success('Logged Out') }} />
			) : (
				<PrimaryButton text='Login' onClick={() => { navigate('/login') }} />
			)
			}
		</div>
	)
}

export default UserStatus