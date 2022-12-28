import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import TaskCard from '../../Shared/TaskCard/TaskCard';

const Media = () => {
    const { user } = useContext(AuthContext)
    //loading data
    const { data: textTasks = [], isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/media/tasks?email=${user?.email}`)
            const data = res.json()
            return data
        }
    })

    if (isLoading) {
        return <p className='text-red-700'>Loading ...</p>
    }

    return (
        <div className='w-[80%] mx-auto min-h-screen my-20'>
            <h1 className='text-4xl text-center font-semibold mb-10'>My Media Tasks</h1>
            <div className='grid grid-flow-col grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>{
                textTasks.map(taskData => <TaskCard taskData={taskData} key={taskData._id} />)
            }
            </div>
        </div>
    );
};

export default Media;