import { Badge, Button, Dropdown, Label, Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiSend } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';

const CompletedTaskCard = ({ taskData, refetch }) => {
    const { _id, image, taskName, description, comment, isComplete } = taskData
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [processing, setProcessing] = useState(false)
    const [visible, setVisible] = useState(false)




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




    const handleNotComplete = id => {

        fetch(`http://localhost:5000/notComplete/tasks/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount > 0) {
                    toast.error("Task Not Completed")
                    refetch()
                    console.log(result)
                    navigate(-1)
                }
            })
    }



    const handleTasksData = data => {
        const taskComment = { comment: data.comment, _id, taskName, description }
        setProcessing(true)

        fetch(`http://localhost:5000/tasks/${_id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`,
                "content-type": "application/json"
            },
            body: JSON.stringify(taskComment)
        })
            .then(res => res.json())
            .then(result => {

                //confirming response
                if (result.modifiedCount > 0) {
                    setProcessing(false)
                    toast.success("Comment Added Successfully.")
                    refetch()

                    console.log(result)
                }
            })
    }




    return (
        <div className="w-[95%] bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 relative">
            <div className="flex justify-end px-4 py-4">
                <ImCross className='text-red-500 hover:text-red-700 hover:bg-red-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white rounded-full h-8 w-8 p-2'></ImCross>
            </div>



            <div className="flex flex-col items-center pb-10">

                {image !== null &&
                    <img className="p-2 w-full h-[150px] rounded-t-lg mb-5" src={image} alt="product" />

                }

                <div className='mx-3 min-h-[80px]'>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{taskName}</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{description?.slice(0, 15) + '...'}<Link to={`/details/${_id}`} className="text-blue-600 dark:text-blue-500 hover:underline">details</Link>
                    </p>
                    {comment &&
                        <div className="my-5">
                            <Badge color="purple" size="sm">{comment}</Badge>

                            <Label></Label>
                        </div>
                    }
                </div>


                <div className='mx-3 mt-2 mb-8'>
                    <form onSubmit={handleSubmit(handleTasksData)} className='flex justify-between items-center gap-2'>

                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Comment' {...register("comment", {
                            required: 'Comment is required'
                        })} />



                        <button type="submit" disabled={processing} className='hover:text-blue-700'>
                            <BiSend className='w-5 h-5'/>
                        </button>


                    </form>
                    {errors.comment && <small className='text-red-500'>{errors.comment?.message}</small>}
                </div>




                <div className="absolute bottom-0">

                    <Button outline={true} gradientDuoTone="purpleToBlue" onClick={() => handleNotComplete(_id)} >Not Completed</Button>


                </div>


            </div>
        </div>

    );
};

export default CompletedTaskCard;