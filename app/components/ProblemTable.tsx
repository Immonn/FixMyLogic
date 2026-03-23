
'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsCheckCircle } from 'react-icons/bs'
import { AiFillYoutube } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useGetProblems } from '../hooks/useGetProblem';

type ProblemTableProps = {
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
    loadingProblems: boolean;
};

const ProblemTable:React.FC<ProblemTableProps> = ({ setLoadingProblems, loadingProblems }) => {
    const problems=useGetProblems(setLoadingProblems);
    const [youtubePlayer,setYoutubePlayer]=useState({
        isOpen:false,
        videoId:""
    });

    const closeModal = () => {
        setYoutubePlayer({ isOpen: false, videoId: "" });
    };

    useEffect(()=>{
        const handleEsc=(e:KeyboardEvent) =>{
            if (e.key==="Escape"){closeModal()}
        }
        window.addEventListener("keydown",handleEsc)
        return () => window.removeEventListener("keydown",handleEsc)
    },[])
    return <>
        <tbody className='text-white'>
            {loadingProblems && Array.from({ length: 6 }).map((_, idx) => (
                <tr key={`skeleton-${idx}`} className='animate-pulse'>
                    <td className='px-6 py-4'>
                        <div className='w-6 h-6 rounded-full bg-gray-600'></div>
                    </td>
                    <td className='px-6 py-4'>
                        <div className='h-4 w-40 rounded-full bg-gray-600'></div>
                    </td>
                    <td className='px-6 py-4'>
                        <div className='h-4 w-28 rounded-full bg-gray-600'></div>
                    </td>
                    <td className='px-6 py-4'>
                        <div className='h-4 w-36 rounded-full bg-gray-600'></div>
                    </td>
                    <td className='px-6 py-4'>
                        <div className='h-4 w-20 rounded-full bg-gray-600'></div>
                    </td>
                </tr>
            ))}

            {!loadingProblems && problems.map((doc,idx)=>{
                const difficultyColor=doc.difficulty==="Easy" ? 'text-dark-green-s' : doc.difficulty==="Medium" ? "text-yellow-500" : "text-red-500";
                return <tr className={`${idx %2==1 ? 'bg-dark-layer-1':''}`} key={doc.id}>
                    <td className='px-6 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                        <BsCheckCircle fontSize={"18"} width={"18"}/>
                    </td>
                    <td className='px-6 py-4'>
                        <Link className='hover:text-blue-600 cursor-pointer' href={`/problems/${doc.id}`}>
                        {doc.title}
                        </Link>
                    </td>
                    <td className={`px-6 py-4 ${difficultyColor}`}>
                        {doc.difficulty}
                    </td>
                    <td className='px-6 py-4'>
                        {doc.category}
                    </td>
                    <td className='px-6 py-4'>
                        {doc.videoId ? <AiFillYoutube onClick={() => setYoutubePlayer({isOpen:true , videoId:doc.videoId as string})} fontSize={"28"} className='cursor-pointer text-red-600 hover:text-white'/> : <p className='text-gray-400'>Coming Soon</p>}
                    </td>
                </tr>
            })}
        </tbody>

        {youtubePlayer.isOpen && typeof window !== "undefined" && createPortal(
            <div className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50'>
                <div
                    className='bg-black opacity-70 top-0 left-0 w-screen h-screen absolute'
                    onClick={closeModal}
                ></div>
                <div className='w-full h-full px-6 relative max-w-4xl'>
                    <div className='w-full h-full flex items-center justify-center relative'>
                        <div className='w-full relative'>
                            <IoClose
                                fontSize={"35"}
                                className='cursor-pointer absolute -top-16 right-0 text-white'
                                onClick={closeModal}
                            />
                            <YouTube
                                videoId={youtubePlayer.videoId}
                                loading='lazy'
                                iframeClassName='w-full min-h-[500px]'
                            />
                        </div>
                    </div>
                </div>
            </div>,
            document.body
        )}
    </>
}
export default ProblemTable;