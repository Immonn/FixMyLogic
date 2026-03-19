import React from 'react';
import Link from 'next/link';
import { problems } from '../mockdata/problem';
import { BsCheckCircle } from 'react-icons/bs'
import { AiFillYoutube } from 'react-icons/ai';

type ProblemTableProps = {
    
};

const ProblemTable:React.FC<ProblemTableProps> = () => {
    
    return <>
        {problems.map((doc,idx)=>{
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
                <td className={`px-6 py-4`}>
                    {doc.videoId ? <AiFillYoutube fontSize={"28"} className='cursor-pointer text-red-600 hover:text-white'/> : <p className='text-gray-400'>Coming Soon</p>}
                </td>
                
            </tr>
        })}
    </>
}
export default ProblemTable;