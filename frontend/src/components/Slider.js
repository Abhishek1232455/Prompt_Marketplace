import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Slider = () => {

    const promptData = useSelector((state) => state.prompts?.data) || [];

    const navigate = useNavigate();

    const handleClick = (id) =>{
        navigate(`/prompt/${id}`);
    }
    // console.log(promptData);

    return (
        <div>
            <div className="min-h-screen bg-gray-100 relative">

                <h1 className='text-3xl absolute left-40 top-64 sm:text-5xl block font-extrabold text-slate-500'>Most Popular This Week.

                    <p className='mt-4 sm:text-xl block font-mono text-black'>Find the Latest Prompts of the week</p>
                    <p className='sm:text-xl block font-mono text-black'>and add it to your collection</p>
                </h1>
                <div className="w-96 mx-auto" style={{ scrollSnapType: 'x mandatory' }}>
                    <div className>
                        <input className="sr-only peer" type="radio" name="carousel" id="carousel-1" defaultChecked />
                        <div className="w-96 absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg transition-all duration-300 opacity-0 peer-checked:opacity-100 peer-checked:z-10 z-0">
                            <img className="rounded-t-lg w-96 h-64" src={promptData[0]?.imageUrl} alt="popular prompt" />
                            
                            <div className="py-4 px-8">
                                <h1 className="hover:cursor-pointe  r mt-2 text-gray-900 font-bold text-2xl tracking-tight">
                                    {promptData[0]?.name}
                                </h1>
                                <div>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{promptData[0]?.category}</span>
                            </div>
                                <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">
                                    Credit :  {promptData[0]?.price}
                                </p>
                                <button type="button"
                                onClick={()=>handleClick(promptData[0]?._id)}
                                 className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    View
                                </button>
                            </div>
                            <div className="absolute top-1/2 w-full flex justify-between z-20">
                                <label htmlFor="carousel-3" className="inline-block text-red-600 cursor-pointer -translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                                    </svg>
                                </label>
                                <label htmlFor="carousel-2" className="inline-block text-red-600 cursor-pointer translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input className="sr-only peer" type="radio" name="carousel" id="carousel-2" />
                        <div
                            className="w-96 absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg transition-all duration-300 opacity-0 peer-checked:opacity-100 peer-checked:z-10 z-0">
                            <img className="rounded-t-lg w-96 h-64" src={promptData[1]?.imageUrl} alt="popular prompt" />
                            <div className="py-4 px-8">
                                <h1 className="hover:cursor-pointe  r mt-2 text-gray-900 font-bold text-2xl tracking-tight">
                                    {promptData[1]?.name}
                                </h1>
                                <div>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{promptData[1]?.category}</span>
                            </div>
                                <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">
                                    Credit :  {promptData[1]?.price}
                                </p>
                                <button type="button"
                                onClick={()=>handleClick(promptData[1]?._id)}
                                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    View
                                </button>
                            </div>
                             <div className="absolute top-1/2 w-full flex justify-between z-20">
                                <label htmlFor="carousel-1" className="inline-block text-blue-600 cursor-pointer -translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                                    </svg>
                                </label>
                                <label htmlFor="carousel-3" className="inline-block text-blue-600 cursor-pointer translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className>
                        <input className="sr-only peer" type="radio" name="carousel" id="carousel-3" />
                        <div
                            className="w-96 absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg transition-all duration-300 opacity-0 peer-checked:opacity-100 peer-checked:z-10 z-0">
                            <img className="rounded-t-lg w-96 h-64" src={promptData[2]?.imageUrl} alt="popular prompt" />
                            <div className="py-4 px-8">
                                <h1 className="hover:cursor-pointe  r mt-2 text-gray-900 font-bold text-2xl tracking-tight">
                                    {promptData[2]?.name}
                                </h1>
                                <div>
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300">{promptData[2]?.category}</span>
                            </div>
                                <p className="hover:cursor-pointer py-3 text-gray-600 leading-6">
                                    Credit :  {promptData[2]?.price}
                                </p>
                                <button type="button"
                                onClick={()=>handleClick(promptData[2]?._id)}
                                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    View
                                </button>
                            </div>
                            <div className="absolute top-1/2 w-full flex justify-between z-20">
                                <label htmlFor="carousel-2" className="inline-block text-yellow-600 cursor-pointer -translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                                    </svg>
                                </label>
                                <label htmlFor="carousel-1" className="inline-block text-yellow-600 cursor-pointer translate-x-5 bg-white rounded-full shadow-md active:translate-y-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default Slider