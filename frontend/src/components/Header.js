import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GiNinjaHead } from "react-icons/gi";
import { HiMiniCommandLine } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/authRedux/authSlice';
import toast from 'react-hot-toast';
import { GiToken } from "react-icons/gi";

const Header = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const { user } = useSelector((state) => state.auth);
    // console.log(user);
    const dispatch = useDispatch();


    const handleLogOut = () => {
        dispatch(logoutRedux());
        localStorage.clear();
        toast.success("Successfully Logged Out !")
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }

    return (
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white rounded-xl'>
            {/* desktop */}
            <div className='flex items-center justify-between'>
                <Link to="/">
                    <div className='flex p-2 items-center text-center'>
                        <HiMiniCommandLine size="3rem" className='h-full' /> <span className='text-3xl font invisible md:visible lg:visible'>Prompt Market</span>
                    </div>
                </Link>

                <div className='flex items-center gap-4 md:gap-7'>
                    <nav className='flex gap-4 md:gap-7 text-base md:text-lg'>
                        <Link to={""}>Home</Link>
                        <Link to={"categories"}>Categories</Link>
                        <Link to={"about"}>About</Link>
                        <Link to={"contact"}>Contact</Link>
                    </nav>
                    {user && <div className='flex'>
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-1 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                            <Link to={"/userPrompts"} className="relative rounded-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 group-hover:bg-opacity-0 md:text-xs sm:text-xs">
                                Your Collection
                            </Link>
                        </button>
                        <Link to={"/pricing"} className=" cursor-pointer flex justify-center items-center gap-2 p-2 px-4 font-medium bg-white">
                            <GiToken />
                            <div>
                                {user?.userCredits}
                            </div>
                            Credits
                        </Link>
                    </div>
                    }
                    <div className="text-2xl" onClick={() => setShowMenu(prev => !prev)}>
                        <div className="border-2  cursor-pointer border-solid border-black p-1 rounded-full">
                            <GiNinjaHead />
                        </div>
                        {showMenu &&
                            <div className="absolute right-10 rounded-xl text-base bg-white py-2 shadow drop-shadow-md flex flex-col gap-2">
                                {user && <div className='link link-success text-center px-2'>{user.firstName}</div>}
                                {user?.role === "Admin" && <Link to={"newprompts"} className='whitespace-nowrap cursor-pointer px-4'>Add new Prompts</Link>}
                            </div>
                        }
                    </div>
                    {user ? <p onClick={handleLogOut} className='btn btn-outline btn-error btn-sm'>Logout</p> : <Link to={"login"} className='btn btn-outline btn-info btn-sm px-2'>LogIn</Link>}
                </div>
            </div>

            {/* Mobile */}
        </header>
    )
}

export default Header