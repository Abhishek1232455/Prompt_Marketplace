import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setCat } from "../redux/category"


const CategorySlider = () => {

    const dispatch = useDispatch()
    const slideLeft = () => {
        var slider = document.getElementById('category_slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideRight = () => {
        var slider = document.getElementById('category_slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <>
            <div className='relative flex items-center w-full px-2'>
                <button 
                    onClick={slideLeft} 
                    className="absolute left-0 z-10 w-10 h-10 rounded-full bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center border border-stone-200 shadow-md cursor-pointer transition-all text-lg font-bold"
                >
                    ‹
                </button>
                
                <div
                    id='category_slider'
                    className='w-full flex gap-6 py-6 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth scrollbar-hide px-6'
                >
                    {[
                        { id: "GitHub Copilot", label: "GitHub Copilot", image: "/assets/Copilot.jpg" },
                        { id: "Chatgpt", label: "ChatGPT", image: "/assets/chat_gpt.png" },
                        { id: "Bard AI", label: "Gemini / Bard AI", image: "/assets/bard.jpg" },
                        { id: "Copyai", label: "Copy.ai", image: "/assets/copyai.jpg" },
                        { id: "MidJourney", label: "Midjourney", image: "/assets/mid-journey.jpg" },
                        { id: "Bing Chat", label: "Bing Chat", image: "/assets/bing.png" },
                        { id: "DALL-E", label: "DALL-E", image: "/assets/dalle.jpg" }
                    ].map((catItem) => (
                        <Link 
                            key={catItem.id} 
                            to="/categories" 
                            onClick={() => dispatch(setCat(catItem.id))} 
                            className="inline-block cursor-pointer shrink-0"
                        >
                            <div className="group relative w-72 h-40 rounded-2xl overflow-hidden border border-stone-200/80 shadow-md hover:border-emerald-500/40 transition-all duration-300">
                                <img 
                                    src={catItem.image} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    alt={catItem.label} 
                                />
                                {/* Bottom overlay gradient for readable text */}
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/10 to-transparent flex items-end p-4">
                                    <span className="text-sm font-bold text-white tracking-wide">
                                        {catItem.label}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <button 
                    onClick={slideRight} 
                    className="absolute right-0 z-10 w-10 h-10 rounded-full bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center border border-stone-200 shadow-md cursor-pointer transition-all text-lg font-bold"
                >
                    ›
                </button>
            </div>
        </>
    )
}

export default CategorySlider