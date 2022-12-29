import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import TaskCard from '../../Shared/TaskCard/TaskCard';

const MyTask = () => {
    const { user } = useContext(AuthContext)


    const url = `https://daily-task-manager-server.vercel.app/text/tasks?email=${user?.email}`

    //loading data
    const { data: textTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = res.json()
            return data
        }
    })

    if (isLoading) {
        return <p className='text-red-700'>Loading ...</p>
    }



    return (
        <div className='w-[80%] mx-auto min-h-screen my-20'>
            <h1 className='text-4xl text-center font-semibold mb-10'>My Tasks</h1>


            <div className='grid grid-flow-row grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
                {textTasks && textTasks.map(taskData => <TaskCard taskData={taskData} key={taskData._id} refetch={refetch} />)
                }
            </div>


        </div>
    );
};

export default MyTask;