import { Button } from 'flowbite-react';
import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const TaskDetails = () => {
    const { image, taskName, description, userName, email } = useLoaderData()
    const navigate = useNavigate()


    return (
        <div className="w-[90%] mx-auto min-h-screen">

            <h1 className='text-4xl font-semibold text-center mt-20'>Task Details</h1>

            <div className="flex flex-col items-center border rounded-lg shadow-md md:flex-row md:max-w-[80%] my-12 mx-auto dark:bg-gray-800 dark:hover:bg-gray-700">
                
                {image &&
                    <img className="object-cover w-full rounded-t-lg h-80 md:w-80 md:rounded-none md:rounded-l-lg" src={image} alt="" />
                }

                <div className="w-full flex flex-col justify-between p-5 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight">{taskName}</h5>
                    <p className="mb-3 font-normal">{description}</p>
                    <Button onClick={() => navigate(-1)} size="sm" className='w-[40%]'>BACK</Button>
                </div>
                <hr />
                <div className='text-black bg-gray-300 dark:bg-gray-800 w-full text-center rounded-lg'>
                    <small>{userName}</small>
                    <br />
                    <small>{email}</small>
                </div>
            </div>
        </div>
    );
};

export default TaskDetails;