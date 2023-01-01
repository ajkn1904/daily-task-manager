import React, { useContext, useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import useToken from '../../Shared/Hooks/useToken';

import styles from '../AddTask/myStyle.module.scss'
import { Button } from 'flowbite-react';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';



const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { createUser, continueWithProvider,
        userProfileUpdate, loading, setLoading } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate()
    const [signUpError, setSignUpError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)


    useEffect(() => {
        if (token) {
            setLoading(false)
            navigate('/')
        }
    }, [token, navigate])


    if (loading) {
        return <p className='text-red-700 min-h-[80vh] text-center'><LoadingSpinner/></p>
    }

    const storeUser = (name, email) => {
        const user = {
            name,
            email
        }
        fetch('https://daily-task-manager-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                //navigate('/')
                setCreatedUserEmail(email)
                setLoading(false)
            })
    }


    const handleProfile = (data) => {
        const userInfo = {
            displayName: data.name
        }

        userProfileUpdate(userInfo)
            .then(() => {
                setLoading(false)
                //navigate('/')
                storeUser(data.name, data.email)
            })
            .catch((error) => {
                setSignUpError(error.message)
                setLoading(false)
            })
    }


    const handleGoogleSignUp = () => {
        continueWithProvider(googleProvider)
            .then(res => {
                const user = res.user
                toast.success("Registration Successful")
                setLoading(false)
                //navigate('/')
                storeUser(user.displayName, user.email)
            })
            .catch((error) => {
                setSignUpError(error.message)
                setLoading(false)
            })
    }



    const handleSignUp = data => {
        if (data.password !== data.confirmPassword) {
            setSignUpError('Your password did not match.')
                ('Your password did not match.')
            return setSignUpError('Your password did not match.')
                ;
        }
        setSignUpError('')
        createUser(data.email, data.password)
            .then(res => {
                const user = res.user
                console.log(user)
                toast.success("Registration Successful")
                handleProfile(data)
            }
            )
            .catch(error => {
                setSignUpError(error.message)
                setLoading(false)
            })
    }


    return (
        <div className='min-h-screen'>
            <h1 className='text-3xl font-semibold text-center my-14'>Sign Up Here</h1>
            <form onSubmit={handleSubmit(handleSignUp)} className='max-w-md mx-auto border px-5 py-10 rounded-lg mt-14 mb-28'>


                <div className={styles.myStyle}>
                    
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-7" placeholder='Name' {...register("name")} />



                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-7" placeholder="Email" {...register("email", { required: "Email is required" })} />

                    {errors.email && <p className='text-error'>{errors.email?.message}</p>}



                    <label className="label">
                        <span className="label-text">Your Password</span>
                    </label>
                    <input type="password" className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-7" placeholder="Password" {...register("password",
                        {
                            required: "Password is required",
                            minLength: { value: 6, message: 'Password must be at least 6 character long' }
                        })} />

                    {errors.password && <p className='text-error'>{errors.password?.message}</p>}



                    <label>
                        <span className="label-text">Confirm password</span>
                    </label>
                    <input type="password" className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-7" placeholder="Confirm Password" {...register("confirmPassword",
                        {
                            required: "Password is required",
                            minLength: { value: 6, message: 'Password must be at least 6 character long' }
                        })} />

                    {errors.confirmPassword && <p className='text-error'>{errors.confirmPassword?.message}</p>}

                </div>


                <small className='text-red-600'>{signUpError}</small>


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-8">SIGN UP</button>

                <small>Already have an account? <Link to="/signin" className='text-blue-600'>Sign In</Link></small>


                <div className="inline-flex justify-center items-center w-full">
                    <hr className="my-8 w-64 h-1 bg-gray-200 rounded border-0 dark:bg-gray-700" />
                    <p className="absolute left-1/2 px-4 text-black rounded-full font-bold bg-white -translate-x-1/2 dark:bg-gray-900">Or</p>
                </div>

                <Button gradientDuoTone="cyanToBlue" onClick={handleGoogleSignUp} className='w-full'><FaGoogle className='mr-2' /> <span>CONTINUE WITH GOOGLE</span></Button>




            </form>
        </div>
    );
};

export default SignUp;