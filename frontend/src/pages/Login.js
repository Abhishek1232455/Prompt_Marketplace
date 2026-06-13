import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BiHide, BiShowAlt } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginRedux } from '../redux/authRedux/authSlice';

const Login = () => {
    const [showPassword, setShowPassord] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please enter all required fields')
            return;
        } else {
            const data = {
                email,
                password,
            }

            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const response = await fetchData.json()
            if (response.success) {
                localStorage.setItem('token', response.token)
                toast.success((response.user?.firstName || "User") + " " + response.message);

                dispatch(loginRedux(response.user))
                navigate('/');
            } else {
                toast.error(response.message);
                return;
            }
        }
    }

    return (
        <div className='py-24 px-4 flex items-center justify-center min-h-[80vh] bg-[#FAF8F5]'>
            <div className="w-full max-w-md glass-card bg-white border border-stone-200/60 rounded-3xl p-8 shadow-xl flex flex-col gap-6">
                <div className="text-center">
                    <h1 className='text-3xl font-extrabold text-stone-900 tracking-tight'>Log In</h1>
                    <p className="text-xs text-stone-500 mt-1.5 font-normal">Welcome back! Sign in to manage your collection.</p>
                </div>

                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-stone-700">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    
                    <div className='flex flex-col gap-1.5 relative'>
                        <label className="text-xs font-bold text-stone-700">Password</label>
                        <div className='relative w-full'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input pr-10"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <span className='absolute right-3.5 top-1/2 transform -translate-y-1/2 text-stone-400 cursor-pointer text-lg' onClick={() => setShowPassord((prev) => !prev)}>
                                {showPassword ? <BiHide /> : <BiShowAlt />}
                            </span>
                        </div>
                    </div>
                    
                    <button className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md mt-4">
                        SIGN IN
                    </button>
                    
                    <div className='text-center text-xs text-stone-550 mt-2 font-medium'>
                        Don't have an account? <Link to={"/signup"} className='text-emerald-600 hover:underline'>Create Account</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login