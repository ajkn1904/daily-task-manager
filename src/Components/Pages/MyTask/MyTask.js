import { useQuery } from '@tanstack/react-query';
import React from 'react';

const MyTask = () => {
    //loading data
    const { data: textTasks = [], isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/text/tasks')
            const data = res.json()
            return data
        }
    })

    if (isLoading) {
        return <p className='text-red-700'>Loading ...</p>
    }

console.log(textTasks)

    return (
        <div>
            This is my task
        </div>
    );
};

export default MyTask;