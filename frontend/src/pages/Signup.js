import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BiHide, BiShowAlt } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [showPassword, setShowPassord] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (firstName && password && email && confirmPassword) {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            const data = {
                email,
                firstName,
                lastName,
                password,
            }
            
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signup`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            
            const response = await fetchData.json()
            if (response.success) {
                toast.success(response.message);
                navigate('/login')
            } else {
                toast.error(response.message);
                return;
            }
        } else {
            toast.error("Please fill in all fields!");
            return;
        }
    }

    return (
        <div className='py-16 px-4 flex items-center justify-center min-h-[85vh] bg-[#FAF8F5]'>
            <div className="w-full max-w-md glass-card bg-white border border-stone-200/60 rounded-3xl p-8 shadow-xl flex flex-col gap-6">
                <div className="text-center">
                    <h1 className='text-3xl font-extrabold text-stone-900 tracking-tight'>Create Account</h1>
                    <p className="text-xs text-stone-500 mt-1.5 font-normal">Get credits to unlock and execute prompt templates.</p>
                </div>

                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-stone-700" htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id='firstName'
                                placeholder="John"
                                className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input"
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-stone-700" htmlFor="lastName">Last Name</label>
                            <input 
                                type="text" 
                                id='lastName' 
                                placeholder="Doe" 
                                className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input" 
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-stone-700" htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id='email' 
                            placeholder="name@example.com" 
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 relative">
                        <label className="text-xs font-bold text-stone-700" htmlFor="password">Password</label>
                        <div className="relative w-full">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id='password' 
                                placeholder="••••••••" 
                                className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input pr-10" 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-stone-400 cursor-pointer text-lg" onClick={() => setShowPassord((prev) => !prev)}>
                                {showPassword ? <BiHide /> : <BiShowAlt />}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-stone-700" htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            type="password" 
                            id='confirmPassword' 
                            placeholder="••••••••" 
                            className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input" 
                            onChange={(e) => setConfirmPassword(e.target.value)}    
                            required
                        />
                    </div>

                    <button className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md mt-4">
                        CREATE ACCOUNT
                    </button>

                    <div className='text-center text-xs text-stone-550 mt-2 font-medium'>
                        Already have an account? <Link to={"/login"} className='text-emerald-600 hover:underline'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup