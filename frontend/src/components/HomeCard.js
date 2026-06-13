import React from "react";
import { useNavigate } from "react-router-dom";

const HomeCard = ({ name, image, category, price,  id }) => {

    const navigate = useNavigate();

    // console.log({
    //     id,
    //     name,
    //     image,
    //     category,
    //     price,
    //     promptDescription,
    //     promptData,
    // });

    const handleClick = (id) =>{
        navigate(`/prompt/${id}`);
    }

    return (
        <div className="glass-card group overflow-hidden rounded-2xl w-full max-w-[280px] flex flex-col bg-white border border-stone-200/50 shadow-md hover:border-emerald-500/40 transition-all duration-300">
            {/* Image Container with Zoom effect */}
            <div className="w-full h-44 overflow-hidden relative">
                <img 
                    src={image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={name} 
                    onError={(e) => {
                        e.target.onError = null;
                        e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                    }}
                />
                <div className="absolute top-3 left-3">
                    <span className="bg-emerald-50/95 backdrop-blur-sm text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-100/40 shadow-sm">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex flex-col flex-1 gap-2">
                <h3 className="text-sm font-bold text-stone-900 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors">
                    {name.length > 22 ? `${name.substring(0, 20)}...` : name}
                </h3>
                
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-stone-100">
                    <div className="text-xs text-stone-500 font-medium">
                        Cost: <span className="text-xs font-bold text-emerald-600">{price} Credits</span>
                    </div>
                    
                    <button 
                        type="button"
                        onClick={() => handleClick(id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors shadow-sm"
                    >
                        Playtest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;