import React, { useEffect, useState } from 'react'
import HomeCard from './HomeCard';
import { useSelector, useDispatch } from 'react-redux'
import { setCat } from "../redux/category"


const Sidebar = () => {

    const cat = useSelector((state) => state.category.cat)
    const dispatch = useDispatch()
    
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getdata = async (cat) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/category/${cat}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            // console.log(data);
            setData(data.prompts)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getdata(cat);
    }, [cat])

    return (
        <div>
            <div className="min-h-screen flex flex-row bg-gray-100">
                <div className="flex flex-col w-56 bg-white overflow-hidden">
                    <div className="flex items-center justify-center h-20 shadow-md">
                        <h1 className="text-3xl uppercase text-gray-800">Categories</h1>
                    </div>
                    <ul className="flex flex-col py-4">
                        <li>
                            <div
                                onClick={() => {dispatch(setCat("Chatgpt")); getdata("Chatgpt")}}
                                className={cat === "Chatgpt" ?
                                    "flex text-lg  font-medium bg-slate-500 text-white cursor-pointer -ml-3 pl-10 flex-row items-center h-12 "
                                    :
                                    "flex text-lg  font-medium cursor-pointer ml-5 flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
                                Chat GPT
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => { dispatch(setCat("Bard AI")); getdata("Bard AI") }}
                                className={cat === "Bard AI" ?
                                    "flex text-lg  font-medium bg-slate-500 text-white cursor-pointer -ml-3 pl-10 flex-row items-center h-12 "
                                    :
                                    "flex text-lg  font-medium cursor-pointer ml-5 flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
                                Bard AI
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => {dispatch(setCat("MidJourney")); getdata("MidJourney") }}
                                className={cat === "MidJourney" ?
                                    "flex text-lg  font-medium bg-slate-500 text-white cursor-pointer -ml-3 pl-10 flex-row items-center h-12 "
                                    :
                                    "flex text-lg  font-medium cursor-pointer ml-5 flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
                                Mid Journey
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => {dispatch(setCat("Copyai")); getdata("Copyai") }}
                                className={cat === "Copyai" ?
                                    "flex text-lg  font-medium bg-slate-500 text-white cursor-pointer -ml-3 pl-10 flex-row items-center h-12 "
                                    :
                                    "flex text-lg  font-medium cursor-pointer ml-5 flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
                                Copy.ai
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => {dispatch(setCat("Bing Chat")); getdata("Bing Chat") }}
                                className={cat === "Bing Chat" ?
                                    "flex text-lg  font-medium bg-slate-500 text-white cursor-pointer -ml-3 pl-10 flex-row items-center h-12 "
                                    :
                                    "flex text-lg  font-medium cursor-pointer ml-5 flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
                                Bing Chat
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => {dispatch(setCat("DALL-E")); getdata("DALL-E") }}
                                className={cat === "DALL-E" ?
                                    "flex text-lg  font-medium bg-slate-500 text-white cursor-pointer -ml-3 pl-10 flex-row items-center h-12 "
                                    :
                                    "flex text-lg  font-medium cursor-pointer ml-5 flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
                                DALL-E
                            </div>
                        </li>
                        <li>
                            <div
                                onClick={() => {dispatch(setCat("GitHub Copilot")); getdata("GitHub Copilot") }}
                                className={cat === "GitHub Copilot" ?
                                    "flex text-lg  font-medium bg-slate-500 text-white cursor-pointer -ml-3 pl-10 flex-row items-center h-12 "
                                    :
                                    "flex text-lg  font-medium cursor-pointer ml-5 flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"}>
                                GitHub Copilot
                            </div>
                        </li>
                    </ul>
                </div>


                {isLoading &&
                    <div className="w-full flex items-center justify-center gap-4">
                        <div
                            className="w-40 h-40 rounded-full animate-spin border-y-8 border-solid border-violet-500 border-t-transparent shadow-md">
                        </div>
                    </div>}
                {!isLoading && <div className="grid lg:grid-cols-4 gap-2 md:grid-cols-2 sm:grid-cols-1">
                    {data.length > 0 && isLoading === false ? data.map((item) => (
                        <div className='m-2'>
                            <HomeCard name={item.name} image={item.imageUrl} category={item.category} price={item.price} promptDescription={item.promptDescription} promptData={item.promptData} id={item._id} />
                        </div>
                    ))
                        : <>
                            <h1 className='text-2xl'>No Prompt for this Category</h1>
                        </>}
                </div>
                }


            </div>
        </div>
    )
}

export default Sidebar