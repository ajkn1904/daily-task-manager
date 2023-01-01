//import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import TaskCard from '../../Shared/TaskCard/TaskCard';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const MyTask = () => {
    const { user } = useContext(AuthContext)
    const [textTasks, setTextTasks] = useState([])
    const [reFetch, setReFetch] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    //const url = `https://daily-task-manager-server.vercel.app/text/tasks?email=${user?.email}`

    //loading data
    /*     const { data: textTasks = [], isLoading, refetch } = useQuery({
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
    
        */

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://daily-task-manager-server.vercel.app/text/tasks?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setTextTasks(data)
                setIsLoading(false)
            })
    }, [reFetch, user?.email])



    if (isLoading) {
        return <p className='text-red-700 min-h-[80vh] text-center'><LoadingSpinner/></p>
    }





    return (
        <div className='w-[80%] mx-auto min-h-screen my-20'>
            <h1 className='text-4xl text-center font-semibold mb-10'>My Tasks</h1>


            <div className='grid grid-flow-row grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
                {textTasks && textTasks?.map(taskData => <TaskCard taskData={taskData} key={taskData._id} reFetch={reFetch} setReFetch={setReFetch} />)
                }
            </div>


        </div>
    );
};

export default MyTask;