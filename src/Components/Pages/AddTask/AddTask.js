import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { Link } from 'react-router-dom';

import styles from './myStyle.module.scss'
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';


const AddTask = () => {

    const { user, loading } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const navigate = useNavigate()
    const imgHostingKey = process.env.REACT_APP_imgbb_key;
    const [processing, setProcessing] = useState(false)
    const date = new Date()

    if (loading) {
        return <p className='text-red-700 min-h-[80vh] text-center'><LoadingSpinner/></p>
    }



    const handleAddTasks = (data) => {
        setProcessing(true)
        const image = data.image[0]
        const formData = new FormData()

        if (data.image[0]) {

            formData.append('image', image)
            const url = `https://api.imgbb.com/1/upload?&key=${imgHostingKey}`


            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(imgData => {
                    if (imgData.success) {


                        const tasks = {
                            taskName: data.taskName,
                            image: imgData.data.url,
                            description: data.description,
                            userName: data.userName,
                            email: data.userEmail,
                            imageStatus: true,
                            date: date.toDateString()
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
                                navigate('/media')
                            })
                    }
                })
        }
        else {
            const tasks = {
                taskName: data.taskName,
                image: null,
                description: data.description,
                userName: data.userName,
                email: data.userEmail,
                imageStatus: false,
                date: date.toDateString()
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


    }


    return (
        <div className='min-h-screen'>

            <h1 className='text-2xl font-bold text-center mt-10 mb-4'>ADD A tasks</h1>
            <div className='flex justify-center items-center mb-20 p-4'>
                <div className='card shadow-xl w-10/12 md:w-6/12 p-7 rounded-md border border-gray-50 mb-10'>

                    <form onSubmit={handleSubmit(handleAddTasks)}>
                    
                    <div className={styles.myStyle}>

                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-7" defaultValue={user?.displayName}  {...register("userName")} />



                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-7" defaultValue={user?.email}  {...register("userEmail")} />



                        <label className="label">
                            <span className="label-text">Task Name</span>
                        </label>
                        

                            <input type="text" className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-7"  {...register("taskName", {
                                required: 'Photo is required'
                            })} />

                        



                        {errors.taskName && <p className='text-error'>{errors.taskName?.message}</p>}




                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea type="textarea" className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-h-[80px] p-2.5 mb-7"  {...register("description", {
                            required: 'Photo is required'
                        })} />

                        {errors.description && <p className='text-error'>{errors.description?.message}</p>}



                        <label className="label">
                            <span className="label-text">Task's image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mb-7" {...register("image")} />
                        
                        
                        </div>


                        <div className="flex flex-col w-full border-opacity-50 my-5">
                            {
                                user?.uid ?

                                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit" disabled={processing}>
                                        {processing ? 'Processing' : 'Add Task'}
                                    </button>
                                    :
                                    <Link to='/signin' className='text-center text-xl font-medium'>To add task <span className='text-blue-600 dark:text-blue-500 hover:underline'>sign in</span> First</Link>

                            }

                        </div>

                    </form>

                </div>


            </div>


        </div>
    );
};


export default AddTask;