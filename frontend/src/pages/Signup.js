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
    const navigete = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(firstName && password && email && confirmPassword){
            
            if((password !== confirmPassword)){
                toast.error("Password and Confirm Password does'nt match")
                return;
            }
            const data = {
                email,
                firstName,
                lastName,
                password,
            }
            
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signup`,{
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            })
            
            const response = await fetchData.json()
            // console.log(response);
            if(response.success){
                toast.success(response.message);
                navigete('/login')
            }else{
                toast.error(response.message);
                return;
            }
        }
        else{
            toast.error("Make sure all field are filled !")
            return;
        }
    }

    return (
        <div className='p-3 md:p-4'>
            <div className="w-full rounded-xl max-w-sm bg-white m-auto flex items-center flex-col p4">
                <h1 className='text-center text-2xl font-bold mt-2'>Sign Up</h1>
                <div>
                    <img src="/assets/user.gif" alt="" />
                </div>

                <form className='mb-5 flex flex-col' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id='firstName'
                            placeholder="User"
                            className="input input-bordered input-sm w-full max-w-xs"
                            onChange={(e)=>setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            type="text" 
                            id='lastName' 
                            placeholder="Last name" 
                            className="input input-bordered input-sm w-full max-w-xs" 
                            onChange={(e)=> setLastName(e.target.value)}
                        />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id='email' 
                            placeholder="email" 
                            className="input input-bordered input-sm w-full max-w-xs" 
                            onChange={(e)=> setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                    <div className='mt-3 max-w-xs relative'>
                        <label htmlFor="password">Password</label>
                        <div className='flex'>
                            <input 
                            type={showPassword ? "text" : "password"} 
                            id='password' 
                            placeholder="password" 
                            className="input input-bordered input-sm w-full max-w-xs" 
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                        <span className='absolute right-1 top-7 text-xl cursor-pointer' onClick={() => setShowPassord((prev) => !prev)}>{showPassword ? <BiHide /> : <BiShowAlt />}</span>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                        type="text" 
                        id='confirmPassword' 
                        placeholder="confirmPassword" 
                        className="input input-bordered input-sm w-full max-w-xs" 
                        onChange={(e)=> setConfirmPassword(e.target.value)}    
                    />
                    </div>

                    <div className='flex justify-center items-center'>
                        <button className=" mt-4 sm:btn-sm md:btn-md lg:btn-sm btn sm:btn-wide md:btn-wide lg:btn-wide btn-info">SIGNUP</button>
                    </div>
                    <div className='mt-3'>Already Have an account?  <Link to={"/login"} className='text-red-400'><u>Login</u></Link></div>
                </form>
            </div>
        </div>
    )
}

export default Signup