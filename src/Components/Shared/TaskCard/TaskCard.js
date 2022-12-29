import React, { useState } from 'react';
import { Button, Dropdown, Label, Modal } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const TaskCard = ({ taskData, refetch }) => {

    const { _id, image, taskName, description, isComplete } = taskData;
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [processing, setProcessing] = useState(false)
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()


    const handleModalOpen = () => {
        setVisible(true)
    }
    const handleModalOff = () => {
        setVisible(false)
        refetch()
    }



    const handleTasksData = data => {
        setProcessing(true)

        fetch(`http://localhost:5000/tasks/${data.id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
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
            fetch(`http://localhost:5000/tasks/${id}`, {
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
                        refetch()
                    }
                })
        }
    }



    const handleComplete = id => {
        fetch(`http://localhost:5000/complete/tasks/${id}`, {
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
                    refetch()
                    console.log(result)
                    navigate('/completedTask')
                }
            })
    }




    return (

        <div className="w-[95%] bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 py-4">
                <Dropdown inline={true} label="" className='hover:bg-blue-200 dark:hover:bg-gray-600 dark:hover:text-white'>

                    <Dropdown.Item>
                        <Label onClick={handleModalOpen} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Edit</Label>

                        <Modal show={visible} size="md" popup={true} onClose={handleModalOff} >
                            <Modal.Body>
                                <form onSubmit={handleSubmit(handleTasksData)}>
                                    <label className="label">
                                        <span className="label-text">Task info</span>
                                    </label>
                                    <input type="text" className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-7" value={_id} readOnly {...register("id")} />


                                    <label className="label">
                                        <span className="label-text">Task Name</span>
                                    </label>
                                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7" defaultValue={taskName} {...register("taskName", {
                                        required: 'Photo is required'
                                    })} />

                                    {errors.taskName && <p className='text-error'>{errors.taskName?.message}</p>}



                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7" defaultValue={description} {...register("description", {
                                        required: 'Photo is required'
                                    })} />

                                    {errors.description && <p className='text-error'>{errors.description?.message}</p>}


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





            <div className="flex flex-col items-center pb-10">

                {image !== null &&
                    <img className="p-2 w-full h-[150px] rounded-t-lg" src={image} alt="product" />

                }

                <div className='mx-3 min-h-[100px]'>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{taskName}</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{description?.slice(0, 15) + '...'}<Link to={`/details/${_id}`} className="text-blue-600 dark:text-blue-500 hover:underline">details</Link>
                    </p>
                </div>

                <div className="flex mt-4 space-x-3 md:mt-6">
                    { isComplete === true ?
                    <Button disabled={true}>Completed</Button>
                    :
                        <button onClick={() => handleComplete(_id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Completed</button>
                    
                    }
                </div>


            </div>
        </div>

    );
};

export default TaskCard;