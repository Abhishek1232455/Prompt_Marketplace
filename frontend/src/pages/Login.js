import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { BiHide, BiShowAlt } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRedux } from '../redux/authRedux/authSlice';

const Login = () => {
    const [showPassword, setShowPassord] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

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
                window.location.replace('/');
            } else {
                toast.error(response.message);
                return;
            }
        }
    }

    return (
        <div className='p-3 md:p-4'>
            <div className="w-full rounded-xl max-w-sm bg-white m-auto flex items-center flex-col p-4 shadow-md">
                <h1 className='text-center text-2xl font-bold mt-2'>Log In</h1>
                <div className="w-24 h-24 my-2 overflow-hidden rounded-full border border-gray-150">
                    <img src="/assets/user.gif" alt="user avatar" className="w-full h-full object-cover" />
                </div>

                <form className='mb-5 flex flex-col w-full px-4' onSubmit={handleSubmit}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="yourname@example.com"
                            className="input input-bordered w-full text-sm bg-gray-50"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className='form-control w-full mt-3 relative'>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className='flex relative w-full'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="input input-bordered w-full text-sm bg-gray-50 pr-10"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer text-gray-500' onClick={() => setShowPassord((prev) => !prev)}>
                                {showPassword ? <BiHide /> : <BiShowAlt />}
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-center items-center mt-6'>
                        <button className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white w-full">LOGIN</button>
                    </div>
                    <div className='mt-4 text-center text-sm text-gray-600'>
                        Create a new account? <Link to={"/signup"} className='text-indigo-600 hover:underline'>Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login