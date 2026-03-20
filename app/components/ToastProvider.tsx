'use client'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = () => {
	return (
		<ToastContainer
			className='fml-toast'
			position='top-center'
			theme='dark'
			autoClose={3000}
			newestOnTop
			pauseOnHover
			toastClassName='fml-toast__card'
			progressClassName='fml-toast__progress'
		/>
	);
};

export default ToastProvider;
