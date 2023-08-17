'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function AddPost() {
    const [post, setPost] = useState({ title: '', desc: '' });
    const router = useRouter();

    const addTodo = (event: any) => {
        event.preventDefault();
        fetch("http://127.0.0.1:8000/api/post/", {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
            },
        }).catch((e) => console.log(e));
        router.push('/');
    };

    const handleChange = (event: any) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    return (
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full items-center justify-center font-mono text-sm ">
                <div className="bg-white dark:bg-gray-900 rounded-md">
                    <div className="py-8 px-4">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white text-center">Add a new Task</h2>

                        <form method='POST' onSubmit={addTodo}>

                            <div className="mb-6">
                                <label htmlFor="title" className=" capitalize block mb-2 text-sm font-medium text-gray-900 dark:text-white">title</label>
                                <input type="text" name="title" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type task name" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea rows={5} name="desc" onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                            </div>

                            <button type="submit" className="btn-primary mt-3 capitalize">
                                Add product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}