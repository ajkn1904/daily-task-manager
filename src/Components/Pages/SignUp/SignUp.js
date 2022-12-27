import React from 'react';
import { FaGoogle } from 'react-icons/fa'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()

    const handleGoogleLogin = () => {}


    const handleRegister = data => {
        console.log(data)
    }


    return (
        <>
            <h1 className='text-3xl font-semibold text-center my-14'>Sign Up Here</h1>
            <form onSubmit={handleSubmit(handleRegister)} className='max-w-md mx-auto border px-5 py-10 rounded-lg my-14'>
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7" placeholder='Name' {...register("name")} />


                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7" placeholder="Email" {...register("email", { required: "Email is required" })} />

                {errors.email && <p className='text-error'>{errors.email?.message}</p>}



                <label className="label">
                    <span className="label-text">Your Password</span>
                </label>
                <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7" placeholder="Password" {...register("password",
                    {
                        required: "Password is required",
                        minLength: { value: 6, message: 'Password must be at least 6 character long' }
                    })} />

                {errors.password && <p className='text-error'>{errors.password?.message}</p>}



                <label>
                    <span className="label-text">Confirm password</span>
                </label>
                <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7" placeholder="Confirm Password" {...register("confirmPassword",
                    {
                        required: "Password is required",
                        minLength: { value: 6, message: 'Password must be at least 6 character long' }
                    })} />

                {errors.confirmPassword && <p className='text-error'>{errors.confirmPassword?.message}</p>}




                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SIGN UP</button>

                <small>Already have an account? <Link to="/signin" className='text-blue-600'>Sign In</Link></small>


                <div className="inline-flex justify-center items-center w-full">
                    <hr className="my-8 w-64 h-1 bg-gray-200 rounded border-0 dark:bg-gray-700" />
                    <p className="absolute left-1/2 px-4 bg-white -translate-x-1/2 dark:bg-gray-900">Or</p>
                </div>

                <button onClick={handleGoogleLogin} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center justify-center w-full"><FaGoogle className='mr-2' /> <span>CONTINUE WITH GOOGLE</span></button>




            </form>
        </>
    );
};

export default SignUp;