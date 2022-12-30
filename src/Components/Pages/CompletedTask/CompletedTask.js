import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
//import { useQuery } from '@tanstack/react-query';
import CompletedTaskCard from './CompletedTaskCard';

const CompletedTask = () => {
    const {user} =  useContext(AuthContext)
    const [completeTasks, setCompleteTasks] = useState([])
    const [reFetch, setReFetch] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

  

    //loading data
/*     const { data: completeTasks = [], isLoading, refetch } = useQuery({
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
//console.log(completeTasks)


useEffect(() => {
    setIsLoading(true)
    fetch(`https://daily-task-manager-server.vercel.app/completed/tasks?email=${user?.email}`, {
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        setCompleteTasks(data)
        setIsLoading(false)
    })
}, [reFetch, user?.email])



if (isLoading) {
    return <p className='text-red-700 min-h-[80vh]'>Loading ...</p>
}




    return (
        <div className='w-[80%] mx-auto min-h-screen my-20'>
            <h1 className='text-4xl text-center font-semibold mb-10'>My Completed Tasks</h1>


            <div className='grid grid-flow-row grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
                { completeTasks && completeTasks?.map(taskData => <CompletedTaskCard taskData={taskData} key={taskData._id} reFetch={reFetch} setReFetch={setReFetch} />)
                }
            </div>


        </div>
    );
};

export default CompletedTask;