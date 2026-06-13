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
        <header className='fixed top-4 left-4 right-4 h-16 px-4 md:px-8 z-50 glass-nav rounded-2xl flex items-center justify-between shadow-md border border-stone-200/50'>
            {/* desktop */}
            <div className='flex items-center justify-between w-full'>
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <div className='flex items-center gap-2 text-stone-900 hover:opacity-90 transition-opacity'>
                            <HiMiniCommandLine size="2rem" className='text-emerald-600' />
                            <span className='text-xl font-bold tracking-tight bg-gradient-to-r from-stone-900 to-stone-600 bg-clip-text text-transparent font-sans'>
                                PromptForge
                            </span>
                        </div>
                    </Link>
                </div>

                <div className='flex items-center gap-4 md:gap-6'>
                    <nav className='hidden md:flex gap-6 md:gap-8 text-sm font-semibold text-stone-600'>
                        <Link to={""} className="hover:text-emerald-600 transition-colors">Home</Link>
                        <Link to={"categories"} className="hover:text-emerald-600 transition-colors">Categories</Link>
                        <Link to={"about"} className="hover:text-emerald-600 transition-colors">About</Link>
                        <Link to={"contact"} className="hover:text-emerald-600 transition-colors">Contact</Link>
                    </nav>
                    
                    {user && (
                        <div className='flex items-center gap-3'>
                            <Link to={"/userPrompts"} className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-white rounded-full bg-emerald-600 hover:bg-emerald-500 transition-all shadow-sm">
                                My Collection
                            </Link>
                            <Link to={"/pricing"} className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-100 hover:border-amber-350 rounded-full transition-all">
                                <GiToken className="text-amber-600 text-sm animate-bounce" />
                                <span>{user?.userCredits} Credits</span>
                            </Link>
                        </div>
                    )}

                    <div className="relative text-2xl" onClick={() => setShowMenu(prev => !prev)}>
                        <div className="border border-stone-200 cursor-pointer p-1.5 rounded-full bg-white hover:border-emerald-500 transition-colors flex items-center justify-center shadow-sm">
                            <GiNinjaHead className="text-emerald-600 text-lg" />
                        </div>
                        {showMenu && (
                            <div className="absolute right-0 mt-3 w-48 rounded-xl text-sm bg-white border border-stone-200 py-2 shadow-xl flex flex-col gap-1 z-50 text-stone-700">
                                {user && (
                                    <div className='text-xs font-bold text-stone-500 px-4 py-1 border-b border-stone-100 text-center mb-1'>
                                        Hi, {user.firstName}
                                    </div>
                                )}
                                <Link to={""} className='md:hidden block px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-emerald-600 transition-colors'>Home</Link>
                                <Link to={"categories"} className='md:hidden block px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-emerald-600 transition-colors'>Categories</Link>
                                <Link to={"about"} className='md:hidden block px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-emerald-600 transition-colors'>About</Link>
                                <Link to={"contact"} className='md:hidden block px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-emerald-600 transition-colors'>Contact</Link>
                                {user && (
                                    <Link to={"/userPrompts"} className='sm:hidden block px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-emerald-600 transition-colors'>
                                        My Collection
                                    </Link>
                                )}
                                {user?.role === "Admin" && (
                                    <Link to={"newprompts"} className='px-4 py-2 hover:bg-stone-50 text-stone-700 hover:text-emerald-600 transition-colors block'>
                                        Add new Prompts
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                    {user ? (
                        <button onClick={handleLogOut} className='btn btn-outline btn-error btn-xs rounded-full px-3 font-semibold'>
                            Logout
                        </button>
                    ) : (
                        <Link to={"login"} className='btn btn-outline btn-info btn-xs rounded-full px-4 font-semibold'>
                            LogIn
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header