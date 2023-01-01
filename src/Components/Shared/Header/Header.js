import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { BiSun } from 'react-icons/bi';
import { HiMoon } from 'react-icons/hi';
import { Navbar } from 'flowbite-react';
import styles from '../../Pages/AddTask/myStyle.module.scss'
import Headroom from 'react-headroom';

const Header = ({ switchTheme, theme }) => {
    const { user, userLogOut } = useContext(AuthContext)

    const handleSignOut = () => {
        userLogOut()
            .then(() => { })
            .cath(error => console.log(error))
    }


    return (
        <Headroom className={styles.myStyle} style={{ webkitTransition: 'all .5s ease-in-out', mozTransition: 'all .5s ease-in-out', oTransition: 'all .5s ease-in-out', transition: 'all .5s ease-in-out' }}>
            <Navbar className={`${styles.navbar}`}>
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link to="/" className="flex items-center">
                        <span className="self-center text-xl font-bold whitespace-nowrap text-purple-500 italic font-serif ml-5">DailyTaskManager</span>
                    </Link>

                    <Navbar.Toggle />
                    <Navbar.Collapse>

                        <ul className="flex flex-col p-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
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
                                        <li className="block md:hidden lg:block py-2 pl-3 pr-4 text-md font-bold italic text-center rounded-t-lg md:p-3 dark:text-white">{user?.displayName}</li>
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
                                        <BiSun className="w-10 h-10 block p-2 rounded font-semibold" onClick={() => switchTheme()}></BiSun>
                                    )
                                        :
                                        (
                                            <HiMoon className="w-10 h-10 block p-2 rounded font-semibold" onClick={() => switchTheme()}></HiMoon>
                                        )
                                }
                            </NavLink>

                        </ul>
                    </Navbar.Collapse>

                </div>
            </Navbar>
        </Headroom>
    );
};

export default Header;