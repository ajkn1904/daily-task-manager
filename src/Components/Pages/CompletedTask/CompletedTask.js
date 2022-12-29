import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import CompletedTaskCard from './CompletedTaskCard';

const CompletedTask = () => {
    const {user} =  useContext(AuthContext)

    const url = `http://localhost:5000/completed/tasks?email=${user?.email}`

    //loading data
    const { data: completeTasks = [], isLoading, refetch } = useQuery({
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
    //console.log(completeTasks)



    return (
        <div className='w-[80%] mx-auto min-h-screen my-20'>
            <h1 className='text-4xl text-center font-semibold mb-10'>My Completed Tasks</h1>


            <div className='grid grid-flow-row grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                { completeTasks && completeTasks.map(taskData => <CompletedTaskCard taskData={taskData} key={taskData._id} refetch={refetch} />)
                }
            </div>


        </div>
    );
};

export default CompletedTask;