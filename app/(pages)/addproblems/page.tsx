//Add Problem into data base
"use client"

import { firestore } from "@/app/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import React from 'react';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    const [inputs,setInput]=useState({
        id:"",
        title:"",
        difficulty:"",
        category:"",
        videoId:"",
        link:"",
        order:0,
        likes:0,
        dislikes:0
    })
    function handleInput(e : React.ChangeEvent<HTMLInputElement>){
        setInput({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }
    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault(); //prevent page refresh
        const newProblem={
            ...inputs,
            order:Number(inputs.order),
        }
        await setDoc(doc(firestore,"problems",inputs.id),newProblem);
        alert("Problem added successfully!")
    }
    return <div className="bg-black h-full">
        <form className="p-6 flex bg-white flex-col max-w-sm gap-3" onSubmit={handleSubmit}>
                    <input onChange={handleInput} type="text" placeholder="problem id" name='id'></input>
                    <input onChange={handleInput} type="text" placeholder="title" name='title'></input>
                    <input onChange={handleInput} type="text" placeholder="difficulty" name='difficulty'></input>
                    <input onChange={handleInput} type="text" placeholder="category" name='category'></input>
                    <input onChange={handleInput} type="text" placeholder="order" name='order'></input>
                    <input onChange={handleInput} type="text" placeholder="videoId?" name='videoId'></input>
                    <input onChange={handleInput} type="text" placeholder="link?" name='link'></input>
                    <button className="bg-white text-black">Save TO Firebase</button>
                </form>
        </div>
}
export default page;