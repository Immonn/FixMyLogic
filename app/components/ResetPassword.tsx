'use client'
import { auth } from "@/app/firebase/firebase";
import React, { useState, useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

type ResetPasswordProps = {
	open?: boolean;
	onclose?: () => void;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ open = false, onclose }) => {
	const [email, setEmail] = useState("");
	const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await sendPasswordResetEmail(email);
		if (success) {
			toast.success("Password reset email sent", { position: "top-center", autoClose: 3000, theme: "dark" });
			setEmail("");
			if (onclose) onclose();
		}
	};

	useEffect(() => {
		if (error) {
			alert(error.message);
		}
	}, [error]);

	if (!open) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 relative'>
				<button
					onClick={onclose}
					className='absolute top-4 right-4 text-gray-400 hover:text-white text-2xl'
				>
					×
				</button>
				<form className='space-y-6' onSubmit={handleReset}>
					<h3 className='text-xl font-medium text-white'>Reset Password</h3>
					<p className='text-sm text-white'>
						Enter your e-mail address below, and we&apos;ll send you an e-mail allowing you
						to reset it. Check your <span className='text-red-500'>SPAM</span> folder.
					</p>
					<div>
						<label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
							Your email
						</label>
						<input
							type='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							id='email'
							className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
							placeholder='name@company.com'
						/>
					</div>

					<button
						type='submit'
						disabled={sending}
						className={`w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                bg-brand-orange hover:bg-brand-orange-s disabled:opacity-50`}
					>
						{sending ? "Sending..." : "Reset Password"}
					</button>
				</form>
			</div>
		</div>
	);
};
export default ResetPassword;
