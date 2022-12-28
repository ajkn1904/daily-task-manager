import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import useToken from '../../Shared/Hooks/useToken';

const SignIn = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [signInError, setSignInError] = useState('');
    const { userLogin, continueWithProvider, loading, setLoading } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathName || '/';
    const [signInUserEmail, setSignInUserEmail] = useState('')
    const [token] = useToken(signInUserEmail)
   

    useEffect(() => {
        if(token){
            navigate(from, {replace:true})
        }
    },[token, from, navigate])


    if (loading) {
        return <p className='text-red-700'>Loading ...</p>
    }


    const handleGoogleLogin = () => {
        continueWithProvider(googleProvider)
            .then(res => {
                const user = res.user;
                console.log(user);
                //navigate(from, {replace:true})
                setSignInUserEmail(user.email)

            })
            .catch(error => setSignInError(error.message))
    }

    const handleLogin = (data) => {
        userLogin(data.email, data.password)
            .then(res => {
                const user = res.user
                console.log(user);
                setSignInError('')
                //navigate(from, {replace:true})
                setSignInUserEmail(data.email)

            })
            .catch(error => {
                setSignInError(error.message)
                setLoading(false)

            })
    }


    return (
        <>
            <h1 className='text-3xl font-semibold text-center my-14'>Sign In Now</h1>
            <form onSubmit={handleSubmit(handleLogin)} className='max-w-md mx-auto border px-5 py-10 rounded-lg my-14'>



                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7" {...register("email", { required: "Email is required" })} />

                {errors.email && <p className='text-error'>{errors.email?.message}</p>}



                <label>
                    <span className="label-text">Password</span>
                </label>
                <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-7" {...register("password",
                    {
                        required: "Password is required"
                    })} />

                {errors.password && <p className='text-error'>{errors.password?.message}</p>}



                <small className='text-red-600'>{ }</small>


                <small className='text-red-600'>{signInError}</small>


                <div className="flex flex-col w-full border-opacity-50">

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SIGN IN</button>
                    <small>Have no account? <Link to="/signup" className='text-blue-600'> Sign up</Link></small>

                    <div className="inline-flex justify-center items-center w-full">
                        <hr className="my-8 w-64 h-1 bg-gray-200 rounded border-0 dark:bg-gray-700" />
                        <p className="absolute left-1/2 px-4 bg-white -translate-x-1/2 dark:bg-gray-900">Or</p>
                    </div>

                    <button onClick={handleGoogleLogin} className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center justify-center w-full"><FaGoogle className='mr-2' /> <span>CONTINUE WITH GOOGLE</span></button>

                </div>

            </form>
        </>
    );
};

export default SignIn;