import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiSend } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [processing, setProcessing] = useState(false)

    const handleTasksData = data => {
        const tasks = {
            taskName: data.taskName,
            image: null,
            description: "Description Not Available",
            userName: user.displayName,
            email: user.email,
            imageStatus: false
        }
        fetch('https://daily-task-manager-server.vercel.app/tasks', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(tasks)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Your tasks added Successfully')
                setProcessing(false)
                navigate('/myTask')
            })
    }



    return (
        <div className='min-h-[80vh] w-[90%] mx-auto'>

            <div className="flex flex-col items-center bg-white md:flex-row-reverse hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-96 md:w-[50%] md:rounded-none md:rounded-l-lg" src="https://i.ibb.co/N1HMrTr/Google-Tasks-Your-Personal-Task-Manager.png" alt="" />


                <div className="flex flex-col justify-between p-4 leading-normal mx-auto">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Manage Your Task</h5>
                    <form onSubmit={handleSubmit(handleTasksData)} className='flex justify-between items-center gap-2'>

                        <label className="label">
                            <span className="label-text">TODO</span>
                        </label>

                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Add Task' {...register("taskName", {
                            required: 'taskName is required'
                        })} />
                        {
                            user?.uid ?
                                <button type="submit" disabled={processing} className='hover:text-blue-700'>
                                    <BiSend className='w-5 h-5' />
                                </button>
                                :
                                <Link to='/signin' className='text-center text-xl font-medium'>To add task <span className='text-blue-600 dark:text-blue-500 hover:underline'>sign in</span> First</Link>

                        }

                    </form>
                    {errors.taskName && <small className='text-red-500'>{errors.taskName?.message}</small>}
                </div>
            </div>

        </div>
    );
};

export default Home;