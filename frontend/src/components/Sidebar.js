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
        <div className="w-full min-h-screen bg-[#FAF8F5]">
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Left Side Navigation Panel */}
                <div className="w-full md:w-60 bg-white/70 backdrop-blur-md border-b md:border-b-0 md:border-r border-stone-200/50 p-4 shrink-0">
                    <div className="h-16 flex items-center px-2 mb-6">
                        <h2 className="text-lg font-bold tracking-wider text-stone-850 uppercase">
                            Platforms
                        </h2>
                    </div>
                    <ul className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible no-scrollbar pb-3 md:pb-0">
                        {[
                            { id: "Chatgpt", label: "ChatGPT" },
                            { id: "Bard AI", label: "Gemini / Bard AI" },
                            { id: "MidJourney", label: "Midjourney" },
                            { id: "Copyai", label: "Copy.ai" },
                            { id: "Bing Chat", label: "Bing Chat" },
                            { id: "DALL-E", label: "DALL-E" },
                            { id: "GitHub Copilot", label: "GitHub Copilot" }
                        ].map((categoryItem) => {
                            const isActive = cat === categoryItem.id;
                            return (
                                <li key={categoryItem.id} className="shrink-0 md:w-full">
                                    <div
                                        onClick={() => {
                                            dispatch(setCat(categoryItem.id));
                                            getdata(categoryItem.id);
                                        }}
                                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center ${
                                            isActive
                                                ? "bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 font-bold"
                                                : "text-stone-600 hover:text-stone-900 hover:bg-stone-50/80 border-l-4 border-transparent pl-4 hover:translate-x-1"
                                        }`}
                                    >
                                        {categoryItem.label}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Right Content Panel */}
                <div className="flex-1 p-6 md:p-8">
                    <div className="mb-6">
                        <h1 className="text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
                            {cat} Prompts
                            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-100/50">
                                {data.length} found
                            </span>
                        </h1>
                    </div>

                    {isLoading ? (
                        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-emerald-500 border-t-transparent shadow-md"></div>
                            <span className="text-xs text-stone-500 font-semibold">Fetching prompts...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {data.length > 0 ? (
                                data.map((item) => (
                                    <div key={item._id} className="w-full flex justify-center">
                                        <HomeCard
                                            name={item.name}
                                            image={item.imageUrl}
                                            category={item.category}
                                            price={item.price}
                                            promptDescription={item.promptDescription}
                                            promptData={item.promptData}
                                            id={item._id}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-16 flex flex-col items-center justify-center text-stone-500 bg-white/40 border border-dashed border-stone-200/80 rounded-2xl">
                                    <span className="text-sm font-bold text-stone-850">No Prompts Found</span>
                                    <span className="text-[11px] text-stone-500 mt-1">We don't have any prompts uploaded in this category yet.</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar