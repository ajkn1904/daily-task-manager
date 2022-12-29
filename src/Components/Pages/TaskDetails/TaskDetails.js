import { useQuery } from '@tanstack/react-query';
import { Card } from 'flowbite-react';
import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
    const { id } = useParams()
    console.log(id)

    const { data: details = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/tasks/${id}`)
            const data = res.json()
            return data
        }
    })

    if (isLoading) {
        return <p className='text-red-700'>Loading ...</p>
    }

    console.log(details)

    return (
        <div className="w-[90%] mx-auto min-h-screen">

            <h1 className='text-4xl font-semibold text-center mt-20'>Task Details</h1>

            <div className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-[80%] mt-12 mx-auto hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-80 md:w-80 md:rounded-none md:rounded-l-lg" src={details?.image} alt="" />
                <div className="w-full flex flex-col justify-between p-2 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{details.taskName}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{details.description}</p>
                </div>
                <hr />
                <div className='bg-gray-300 w-full text-center'>
                    <small>{details.userName}</small>
                    <br />
                    <small>{details.email}</small>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;