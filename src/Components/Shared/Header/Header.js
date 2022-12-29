import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { BiSun } from 'react-icons/bi';
import { HiMoon } from 'react-icons/hi';

const Header = ({switchTheme, theme}) => {
    const { user, userLogOut } = useContext(AuthContext)
 
    const handleSignOut = () => {
        userLogOut()
            .then(() => { })
            .cath(error => console.log(error))
    }


    return (
        <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link to="/" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">DailyTaskManager</span>
                </Link>


                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>


                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                        <li>
                            <Link to="/" className="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 hover:text-white md:p-3 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold">HOME</Link>
                        </li>
                        <li>
                            <Link to="/addTask" className="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 hover:text-white md:p-3 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold">ADD TASK</Link>
                        </li>
                        <li>
                            <Link to="/myTask" className="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 hover:text-white md:p-3 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold">MY TASK</Link>
                        </li>
                        <li>
                            <Link to="/media" className="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 hover:text-white md:p-3 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold">MEDIA</Link>
                        </li>
                        <li>
                            <Link to="/completedTask" className="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 hover:text-white md:p-3 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold">COMPLETED TASK</Link>
                        </li>


                        {
                            user?.uid ?
                                <>
                                    <li><Link to='/' className="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 hover:text-white md:p-3 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold" onClick={handleSignOut}>SIGN OUT</Link></li>
                                    <li className="block py-2 pl-3 pr-4 text-md font-bold italic text-center rounded-t-lg md:p-3 dark:text-white">{user?.displayName}</li>
                                </>
                                :
                                <>
                                    <li>
                                        <Link to="/signin" className="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 hover:text-white md:p-3 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold">SIGN IN</Link>
                                    </li>
                                    <li>
                                        <Link to="/signup" className="block py-2 pl-3 pr-4 rounded hover:bg-blue-700 hover:text-white md:p-3 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-semibold">SIGN UP</Link>
                                    </li>
                                </>
                        }


                        <NavLink>
                            {
                                theme === 'dark' ? (
                                    <BiSun className="w-10 h-10 block p-2 rounded font-semibold"   onClick={() => switchTheme()}></BiSun>
                                )
                                :
                                (
                                    <HiMoon className="w-10 h-10 block p-2 rounded font-semibold" onClick={() => switchTheme()}></HiMoon>
                                )
                            }
                        </NavLink>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;