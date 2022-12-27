import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';


const AddTask = () => {

    const { user, loading } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const navigate = useNavigate()
    const imgHostingKey = process.env.REACT_APP_imgbb_key;
    const [processing, setProcessing] = useState(false)


    if (loading) {
        return <p className='text-red-700'>Loading ...</p>
    }


    const addTAskToDB = tasks => {
        fetch('http://localhost:5000/tasks', {
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
                            cat_id: data.cat_id,
                            taskName: data.taskName,
                            image: imgData.data.url,
                            description: data.description,
                            userName: data.userName,
                            userEmail: data.userEmail,
                        }
                        addTAskToDB(tasks)

                    }
                })
        }
        else {
            const tasks = {
                cat_id: data.cat_id,
                taskName: data.taskName,
                image: null,
                description: data.description,
                userName: data.userName,
                userEmail: data.userEmail,
            }
            addTAskToDB(tasks)
        }


    }


    return (
        <>

            <h1 className='text-2xl font-bold text-center mt-10 mb-4'>ADD A tasks</h1>
            <div className='flex justify-center items-center mb-20 p-4'>
                <div className='card shadow-xl w-11/12 bg-slate-100 p-7'>

                    <form onSubmit={handleSubmit(handleAddTasks)}>


                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7" defaultValue={user?.displayName}  {...register("userName")} />



                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7" defaultValue={user?.email}  {...register("userEmail")} />



                        <label className="label">
                            <span className="label-text">Task Name</span>
                        </label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7"  {...register("taskName", {
                            required: 'Photo is required'
                        })} />

                        {errors.taskName && <p className='text-error'>{errors.taskName?.message}</p>}




                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea type="textarea" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-h-[80px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7"  {...register("description", {
                            required: 'Photo is required'
                        })} />

                        {errors.description && <p className='text-error'>{errors.description?.message}</p>}



                        <label className="label">
                            <span className="label-text">Task's image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7" {...register("image")} />



                        <div className="flex flex-col w-full border-opacity-50 my-5">

                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit" disabled={processing}>{processing ? 'Processing' : 'Add Task'}</button>



                        </div>

                    </form>

                </div>


            </div>


        </>
    );
};


export default AddTask;