import React from 'react';
import { toast } from 'react-hot-toast';
import { ImCross } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';

const CompletedTaskCard = ({ taskData, refetch }) => {
    const { _id, image, taskName, description, isComplete } = taskData
    const navigate = useNavigate()



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






    return (
        <div className="w-[95%] bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end p-4">

                <ImCross onClick={() => handleDelete(_id)} className='text-red-500 hover:text-red-700 hover:bg-red-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white rounded-full h-8 w-8 p-2'></ImCross>

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

                    <button onClick={() => handleNotComplete(_id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Not Completed</button>


                </div>


            </div>
        </div>

    );
};

export default CompletedTaskCard;