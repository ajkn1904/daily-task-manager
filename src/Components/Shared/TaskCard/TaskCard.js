import { Dropdown } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ taskData }) => {
    console.log(taskData)

    const { _id, image, taskName, userName, email, description } = taskData

    return (

        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 py-4">
                <Dropdown inline={true} label="">
                   
                    <Dropdown.Item>
                        <a href="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </Dropdown.Item>
                    <Dropdown.Item>
                    <a href="/" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                    </Dropdown.Item>
                    
                </Dropdown>
            </div>


            <div className="flex flex-col items-center pb-10">

                {image !== null &&
                    <img className="p-8 rounded-t-lg" src={image} alt="product" />

                }

                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{taskName}</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400 mx-5 mb-2">{description.slice(0, 20) + '...  '}
                    <Link to="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</Link>
                </p>

                <div className="flex mt-4 space-x-3 md:mt-6">
                    <a href="/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Completed</a>
                </div>


            </div>
        </div>

    );
};

export default TaskCard;