import React, { useState } from 'react';
import { Button, Dropdown, Label, Modal } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import styles from '../../Pages/AddTask/myStyle.module.scss'


const TaskCard = ({ taskData, reFetch, setReFetch }) => {

    const { _id, image, taskName, description, isComplete, date } = taskData;
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [processing, setProcessing] = useState(false)
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()


    const handleModalOpen = () => {
        setVisible(true)
    }
    const handleModalOff = () => {
        setVisible(false)
        setReFetch(!reFetch)
    }



    const handleTasksData = data => {
        setProcessing(true)
        const taskData = { taskName: data.taskName, description: data.description, comment: "" }

        fetch(`https://daily-task-manager-server.vercel.app/tasks/${data.id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(taskData)
        })
            .then(res => res.json())
            .then(result => {

                //confirming response
                if (result.modifiedCount > 0) {
                    setProcessing(false)
                    toast.success("Task Edited Successfully.")
                    handleModalOff()
                    console.log(result)
                }
            })
    }



    const handleDelete = id => {
        const doDelete = window.confirm('Do you want to delete this product?');
        if (doDelete) {
            fetch(`https://daily-task-manager-server.vercel.app/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount === 1) {
                        toast.error("Deleted Successfully")
                        setReFetch(!reFetch)
                    }
                })
        }
    }



    const handleComplete = id => {
        fetch(`https://daily-task-manager-server.vercel.app/complete/tasks/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount > 0) {
                    toast.success("Task Completed")
                    setReFetch(!reFetch)
                    console.log(result)
                    navigate('/completedTask')
                }
            })
    }




    return (
        <div className={styles.myStyle}>
            <div className="w-[95%] border rounded-lg shadow-md">
                <div className="flex rounded-lg justify-between px-4 py-4">
                    <small className='text-gray-500'>{date}</small>
                    <Dropdown inline={true} label="" className='hover:bg-blue-200'>

                        <Dropdown.Item>
                            <Label onClick={handleModalOpen} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">Edit</Label>

                            <Modal show={visible} size="md" popup={true} onClose={handleModalOff} >

                                <Modal.Header />

                                <Modal.Body>
                                    <form onSubmit={handleSubmit(handleTasksData)}>
                                        <label className="label">
                                            <span className="label-text">Task info</span>
                                        </label>
                                        <input type="text" className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-7" value={_id} readOnly {...register("id")} />


                                        <label className="label">
                                            <span className="label-text">Task Name</span>
                                        </label>
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-7" defaultValue={taskName} {...register("taskName", {
                                            required: 'Task Name is required'
                                        })} />

                                        {errors.taskName && <small className='text-red-500'>{errors.taskName?.message}</small>}



                                        <label className="label">
                                            <span className="label-text">Description</span>
                                        </label>
                                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-7" defaultValue={description} {...register("description", {
                                            required: 'Description is required'
                                        })} />

                                        {errors.description && <small className='text-red-500'>{errors.description?.message}</small>}


                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit" disabled={processing}>
                                            {processing ? 'Processing' : 'Submit'}
                                        </button>
                                    </form>

                                </Modal.Body>
                            </Modal>
                        </Dropdown.Item>

                        <Dropdown.Item>
                            <Label onClick={() => handleDelete(_id)} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Delete</Label>
                        </Dropdown.Item>

                    </Dropdown>
                </div>





                <div className="flex flex-col items-center pb-10 rounded-lg">

                    {image !== null &&
                        <img className="p-2 w-full h-[150px] rounded-t-lg" src={image} alt="product" />

                    }

                    <div className='mx-auto w-[90%] min-h-[80px]'>
                        <h5 className="mb-1 text-xl font-medium ">{taskName}</h5>
                        <p className="text-sm mb-2">{description?.slice(0, 15) + '...'}<Link to={`/details/${_id}`} className="text-blue-600 hover:underline">details</Link>
                        </p>
                    </div>

                    <div className="flex mt-4 space-x-3 md:mt-6">
                        {isComplete === true ?
                            <Button disabled={true}>Completed</Button>
                            :
                            <button onClick={() => handleComplete(_id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Completed</button>

                        }
                    </div>


                </div>
            </div>
        </div>

    );
};

export default TaskCard;