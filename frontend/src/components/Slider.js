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

    if (!promptData || promptData.length < 3) {
        return (
            <div className="py-12 text-center text-slate-500 bg-slate-900/25 border border-slate-800 rounded-2xl">
                <span className="text-sm font-medium">Loading weekly popular prompts...</span>
            </div>
        );
    }

    return (
        <div className="py-12 relative overflow-hidden rounded-3xl border border-stone-200/60 bg-white/50 backdrop-blur-md shadow-sm">
            <div className="flex flex-col lg:flex-row items-center gap-12 px-8 lg:px-16 min-h-[500px]">
                {/* Left Intro Text Column */}
                <div className="flex-1 text-center lg:text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100/60">
                        Top Picks
                    </span>
                    <h1 className='text-3xl sm:text-5xl font-extrabold text-stone-900 mt-5 tracking-tight leading-tight'>
                        Most Popular <br />
                        <span className="text-gradient">This Week</span>
                    </h1>
                    <p className='mt-4 text-stone-500 max-w-md text-sm sm:text-base leading-relaxed font-normal'>
                        Explore the highest-rated templates voted by the community and add them to your playtest collection.
                    </p>
                </div>

                {/* Right Carousel Column */}
                <div className="relative w-full max-w-sm shrink-0 h-[420px] flex items-center justify-center">
                    {/* Item 1 */}
                    <div>
                        <input className="sr-only peer" type="radio" name="carousel" id="carousel-1" defaultChecked />
                        <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-card bg-white/95 rounded-2xl border border-stone-200/60 shadow-xl transition-all duration-300 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto peer-checked:z-10 z-0 overflow-hidden">
                            <img 
                                className="w-full h-48 object-cover" 
                                src={promptData[0]?.imageUrl} 
                                alt={promptData[0]?.name} 
                                onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                                }}
                            />
                            <div className="p-6">
                                <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-100/40">
                                    {promptData[0]?.category}
                                </span>
                                <h3 className="mt-3 text-base font-bold text-stone-900 tracking-tight">
                                    {promptData[0]?.name}
                                </h3>
                                <p className="mt-1.5 text-xs text-stone-500 font-medium">
                                    Cost: <span className="text-emerald-600 font-bold">{promptData[0]?.price} Credits</span>
                                </p>
                                <button 
                                    type="button"
                                    onClick={() => handleClick(promptData[0]?._id)}
                                    className="mt-4 w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
                                >
                                    Get Template
                                </button>
                            </div>
                            <div className="absolute top-1/3 w-full flex justify-between px-3 z-20 pointer-events-auto">
                                <label htmlFor="carousel-3" className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center cursor-pointer border border-stone-200 shadow-md text-lg font-bold">
                                    ‹
                                </label>
                                <label htmlFor="carousel-2" className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center cursor-pointer border border-stone-200 shadow-md text-lg font-bold">
                                    ›
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div>
                        <input className="sr-only peer" type="radio" name="carousel" id="carousel-2" />
                        <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-card bg-white/95 rounded-2xl border border-stone-200/60 shadow-xl transition-all duration-300 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto peer-checked:z-10 z-0 overflow-hidden">
                            <img 
                                className="w-full h-48 object-cover" 
                                src={promptData[1]?.imageUrl} 
                                alt={promptData[1]?.name} 
                                onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                                }}
                            />
                            <div className="p-6">
                                <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-100/40">
                                    {promptData[1]?.category}
                                </span>
                                <h3 className="mt-3 text-base font-bold text-stone-900 tracking-tight">
                                    {promptData[1]?.name}
                                </h3>
                                <p className="mt-1.5 text-xs text-stone-500 font-medium">
                                    Cost: <span className="text-emerald-600 font-bold">{promptData[1]?.price} Credits</span>
                                </p>
                                <button 
                                    type="button"
                                    onClick={() => handleClick(promptData[1]?._id)}
                                    className="mt-4 w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
                                >
                                    Get Template
                                </button>
                            </div>
                            <div className="absolute top-1/3 w-full flex justify-between px-3 z-20 pointer-events-auto">
                                <label htmlFor="carousel-1" className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center cursor-pointer border border-stone-200 shadow-md text-lg font-bold">
                                    ‹
                                </label>
                                <label htmlFor="carousel-3" className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center cursor-pointer border border-stone-200 shadow-md text-lg font-bold">
                                    ›
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div>
                        <input className="sr-only peer" type="radio" name="carousel" id="carousel-3" />
                        <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-card bg-white/95 rounded-2xl border border-stone-200/60 shadow-xl transition-all duration-300 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto peer-checked:z-10 z-0 overflow-hidden">
                            <img 
                                className="w-full h-48 object-cover" 
                                src={promptData[2]?.imageUrl} 
                                alt={promptData[2]?.name} 
                                onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                                }}
                            />
                            <div className="p-6">
                                <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-100/40">
                                    {promptData[2]?.category}
                                </span>
                                <h3 className="mt-3 text-base font-bold text-stone-900 tracking-tight">
                                    {promptData[2]?.name}
                                </h3>
                                <p className="mt-1.5 text-xs text-stone-500 font-medium">
                                    Cost: <span className="text-emerald-600 font-bold">{promptData[2]?.price} Credits</span>
                                </p>
                                <button 
                                    type="button"
                                    onClick={() => handleClick(promptData[2]?._id)}
                                    className="mt-4 w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
                                >
                                    Get Template
                                </button>
                            </div>
                            <div className="absolute top-1/3 w-full flex justify-between px-3 z-20 pointer-events-auto">
                                <label htmlFor="carousel-2" className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center cursor-pointer border border-stone-200 shadow-md text-lg font-bold">
                                    ‹
                                </label>
                                <label htmlFor="carousel-1" className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center cursor-pointer border border-stone-200 shadow-md text-lg font-bold">
                                    ›
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider