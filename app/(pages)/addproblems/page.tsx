"use client";

import { firestore } from "@/app/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProblemPage: React.FC = () => {
	const [inputs, setInput] = useState({
		id: "",
		title: "",
		difficulty: "Easy",
		category: "",
		videoId: "",
		link: "",
		order: 0,
		likes: 0,
		dislikes: 0,
	});

	const [loading, setLoading] = useState(false);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setInput({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.id || !inputs.title || !inputs.category || !inputs.order) {
			toast.error("Please fill in all required fields", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			return;
		}

		setLoading(true);
		try {
			const newProblem = {
				...inputs,
				order: Number(inputs.order),
			};
			await setDoc(doc(firestore, "problems", inputs.id), newProblem);
			toast.success("Problem added successfully!", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			// Reset form after success
			setInput({
				id: "",
				title: "",
				difficulty: "Easy",
				category: "",
				videoId: "",
				link: "",
				order: 0,
				likes: 0,
				dislikes: 0,
			});
		} catch (error: any) {
			toast.error(error.message, {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='bg-dark-layer-2 min-h-screen flex flex-col items-center justify-center p-6'>
			<ToastContainer />
			<div className='bg-dark-layer-1 p-8 rounded-xl shadow-2xl w-full max-w-lg border border-dark-divider-border-2'>
				<h1 className='text-2xl font-bold text-white mb-6 text-center'>Add New Problem</h1>
				<form className='flex flex-col gap-5' onSubmit={handleSubmit}>
					<div className='flex flex-col gap-1'>
						<label htmlFor='id' className='text-sm font-medium text-dark-gray-7'>
							Problem ID <span className='text-brand-orange'>*</span>
						</label>
						<input
							id='id'
							onChange={handleInput}
							value={inputs.id}
							type='text'
							placeholder='e.g. search-a-2d-matrix-ii'
							name='id'
							className='bg-dark-fill-3 border border-dark-divider-border-2 text-white text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 outline-none transition-all'
							required
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor='title' className='text-sm font-medium text-dark-gray-7'>
							Title <span className='text-brand-orange'>*</span>
						</label>
						<input
							id='title'
							onChange={handleInput}
							value={inputs.title}
							type='text'
							placeholder='e.g. Search a 2D Matrix II'
							name='title'
							className='bg-dark-fill-3 border border-dark-divider-border-2 text-white text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 outline-none transition-all'
							required
						/>
					</div>

					<div className='grid grid-cols-2 gap-4'>
						<div className='flex flex-col gap-1'>
							<label htmlFor='difficulty' className='text-sm font-medium text-dark-gray-7'>
								Difficulty <span className='text-brand-orange'>*</span>
							</label>
							<select
								id='difficulty'
								onChange={handleInput}
								value={inputs.difficulty}
								name='difficulty'
								className='bg-dark-fill-3 border border-dark-divider-border-2 text-white text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 outline-none transition-all'
								required
							>
								<option value='Easy'>Easy</option>
								<option value='Medium'>Medium</option>
								<option value='Hard'>Hard</option>
							</select>
						</div>

						<div className='flex flex-col gap-1'>
							<label htmlFor='order' className='text-sm font-medium text-dark-gray-7'>
								Order <span className='text-brand-orange'>*</span>
							</label>
							<input
								id='order'
								onChange={handleInput}
								value={inputs.order}
								type='number'
								placeholder='0'
								name='order'
								className='bg-dark-fill-3 border border-dark-divider-border-2 text-white text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 outline-none transition-all'
								required
							/>
						</div>
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor='category' className='text-sm font-medium text-dark-gray-7'>
							Category <span className='text-brand-orange'>*</span>
						</label>
						<input
							id='category'
							onChange={handleInput}
							value={inputs.category}
							type='text'
							placeholder='e.g. Two Pointers'
							name='category'
							className='bg-dark-fill-3 border border-dark-divider-border-2 text-white text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 outline-none transition-all'
							required
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor='videoId' className='text-sm font-medium text-dark-gray-7'>
							YouTube Video ID
						</label>
						<input
							id='videoId'
							onChange={handleInput}
							value={inputs.videoId}
							type='text'
							placeholder='e.g. jYmX9H9_TfE'
							name='videoId'
							className='bg-dark-fill-3 border border-dark-divider-border-2 text-white text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 outline-none transition-all'
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor='link' className='text-sm font-medium text-dark-gray-7'>
							External Link
						</label>
						<input
							id='link'
							onChange={handleInput}
							value={inputs.link}
							type='text'
							placeholder='URL'
							name='link'
							className='bg-dark-fill-3 border border-dark-divider-border-2 text-white text-sm rounded-lg focus:ring-brand-orange focus:border-brand-orange block w-full p-2.5 outline-none transition-all'
						/>
					</div>

					<button
						type='submit'
						disabled={loading}
						className='mt-2 bg-brand-orange hover:bg-brand-orange-s text-white font-bold py-2.5 rounded-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg'
					>
						{loading ? "Saving..." : "Save to Firebase"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddProblemPage;