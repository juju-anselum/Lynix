import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../services/auth/firebaseApi';
import { toast } from 'react-toastify';

import { logo, loginImage, googleSvg } from '../assets'
import { PrimaryButton, SecondaryButton } from '../components'


const SignUp = () => {
	const navigate = useNavigate();
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState({ userName: '', email: '', password: '' });

	const validSubmit = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		let newError = { userName: '', email: '', password: '' };

		if (!userName) {
			newError.userName = 'Please enter your username.';
		}

		if (!email) {
			newError.email = 'Please enter your email.';
		} else if (!emailRegex.test(email)) {
			newError.email = 'Please enter a valid email.';
		}

		if (!password) {
			newError.password = 'Please enter your password.';
		}

		setError(newError);

		if (
			newError.userName === '' &&
			newError.email === '' &&
			newError.password === ''
		) {
			handleSubmit();
		}
	};

	const handleSubmit = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			await updateProfile(user, { displayName: userName });

			if (user) {
				toast.success('Signed Up Successfully.')
				setTimeout(() => {
					setUserName('');
					setEmail('');
					setPassword('');
					setError({ userName: '', email: '', password: '' });
					navigate('/');
				}, 1000);
			}
		} catch (e) {
			const errorCode = e.code;
			let newError = { userName: '', email: '', password: '' };

			switch (errorCode) {
				case 'auth/email-already-in-use':
					newError.email = 'Email already in use. Please sign in.';
					break;
				case 'auth/invalid-email':
					newError.email = 'Please enter a valid email.';
					break;
				case 'auth/weak-password':
					newError.password = 'Password must be at least 6 characters.';
					break;
				default:
					newError.password = 'Registration failed. Please try again later.';
					break;
			}

			setError(newError);
		}
	};

	const signInWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
			const user = userCredential.user;
			if (user) {
				toast.success('Signed In Successfully.')
				navigate('/');
			}
		} catch (e) {
			toast.error('Sign In failed. Please try again later.')
		}
	};

	return (
		<div className='w-full h-screen flex justify-evenly items-stretch bg-white'>

			<div className='w-full h-screen mt-[10%] md:mt-0 flex items-start md:items-center justify-center'>
				<div className='w-full max-w-[450px] p-6 md:p-4 flex flex-col items-center gap-8 md:gap-10'>
					<div className='w-max mb-12 flex gap-4'>
						<img src={logo} alt="logo" className='w-[40px] object-contain' />
						<h1 className='text-4xl font-bold font-lora uppercase'>Lynix</h1>
					</div>
					<div className='w-full flex flex-col gap-8'>
						<div className='w-full flex flex-col items-start gap-2'>
							<input
								type="text"
								placeholder="Username"
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
								className="w-full px-4 py-3 border rounded-md bg-transparent outline-none border-neutral-400"
							/>
							{error.userName && <p className="text-red-500 text-sm">{error.userName}</p>}
						</div>
						<div className='w-full flex flex-col items-start gap-2'>
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-3 border rounded-md bg-transparent outline-none border-neutral-400"
							/>
							{error.email && <p className="text-red-500 text-sm">{error.email}</p>}
						</div>
						<div className='w-full flex flex-col items-start gap-2'>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-3 border rounded-md bg-transparent outline-none border-neutral-400"
							/>
							{error.password && <p className="text-red-500 text-sm">{error.password}</p>}
						</div>
						<PrimaryButton text='Sign up' onClick={validSubmit} />
					</div>
					<div>
						<p className='text-sm text-black-700'>
							{`Already a User? `}
							<Link to='/login'>
								<span className='text-black-500 text-md font-medium cursor-pointer'>Login</span>
							</Link>
						</p>
					</div>
					<div className='w-full flex gap-4 items-center justify-center'>
						<div className='w-1/4 h-[1px] bg-neutral-500'></div>
						<p className='text-sm text-secondaryColorAccent'>or</p>
						<div className='w-1/4 h-[1px] bg-neutral-500'></div>
					</div>
					<div className='w-full'>
						<SecondaryButton text='Sign In with Google' icon={googleSvg} onClick={signInWithGoogle} />
					</div>
				</div>
			</div>

			<div className='w-full p-8 h-screen hidden lg:block relative '>
				<div className='w-11/12 h-full relative'>
					<img src={loginImage} alt="SignUp Image" className='w-full h-full object-cover rounded-2xl' />
					<div className='w-full h-full absolute top-0 left-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent'></div>
				</div>
			</div>
		</div>
	)
}

export default SignUp