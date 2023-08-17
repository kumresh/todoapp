'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function PostDeletePage() {
    const [data, setData] = useState({ id: '', title: '', desc: '', created: '' });

    const router = useRouter();
    const params = useParams()
    const id = params.id


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/post/${id}`)
            .then((res) => res.json())
            .then((data: any) => {
                setData(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDelete = async () => {
        try {
            await fetch(`http://127.0.0.1:8000/api/post/${id}`, {
                method: 'DELETE',
            });

            // Redirect back to the list of posts or another page
            router.push('/');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">

                <div className="md:w-1/2 lg:w-1/3 bg-sky-950 p-4 rounded-md" key={data.id}>
                    <h2 className="py-3 text-center text-3xl font-bold uppercase">{data.title}</h2>
                    <p className="">{data.desc}</p>
                    <p className="mt-3">{data.created}</p>

                    <button className="mt-3 px-3 py-2 hover:bg-red-600 shadow-md rounded-md bg-red-500" onClick={handleDelete}>DELETE</button>
                </div>

            </div>
        </main>
    );
}

export default PostDeletePage;
