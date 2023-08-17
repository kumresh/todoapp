'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Home() {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const baseUrl = 'http://127.0.0.1:8000/api/post/'

  const getDate = (date: any) => {
    const dateTime = new Date(date);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Months are 0-indexed, so we add 1
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    const milliseconds = dateTime.getMilliseconds();
    const t = ` at ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
    const d = `${day}-${month < 10 ? '0' : ''}${month}-${year}`
    return (
      d + " " + t
    );
  }

  const deletePost = (postId: any) => {
    fetch(`${baseUrl}/${postId}`, {
      method: "DELETE",
    }).catch((e) => console.log(e));
  };

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full items-center justify-center font-mono text-sm">
        <Link href='/post' className='py-2 px-3 bg-emerald-500 capitalize font-bold rounded-md hover:bg-emerald-600'>create task</Link>
        <div className="mt-4 relative overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 ">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  title
                </th>
                <th scope="col" className="px-6 py-3">
                  description
                </th>
                <th scope="col" className="px-6 py-3">
                  created
                </th>
                <th scope="col" className="px-6 py-3">
                  modified
                </th>
                <th scope="col" className="px-6 py-3">
                  update
                </th>
                <th scope="col" className="px-6 py-3">
                  delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((todo: any, index: any) => (
                <tr key={todo.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link href={`post/${todo.id}`}>{todo.title}</Link>
                  </th>
                  <td className="px-6 line-clamp-3 mb-2">
                    {todo.desc}
                  </td>
                  <td className="px-6 py-4">
                    {getDate(todo.created)}
                  </td>
                  <td className="px-6 py-4">
                    {getDate(todo.modified)}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`post/update/${todo.id}`} className="text-3xl text-emerald-400"><EditNoteIcon /></Link>
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`post/delete/${todo.id}`} className="text-red-500 text-3xl"><DeleteForeverIcon /></Link>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
