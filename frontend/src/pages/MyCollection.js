import React, { useEffect, useState } from 'react'
import API from '../services/API'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyCollection = () => {
  const [data, setDate] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await API("api/v1/prompt/userPrompts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      if (!res.success) {
        toast.error(res.message || "Failed to load collection. Please login.");
        navigate('/login');
        return;
      }
      setDate(res.userPrompts || []);
    } catch (error) {
      console.log("Error loading collection:", error);
      setDate([]);
    }
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100/50 shadow-sm">
            Workspace
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold mt-6 tracking-tight text-stone-900">
            My Collection
          </h2>
          <p className="mt-4 text-stone-500 text-sm max-w-lg leading-relaxed">
            Your purchased AI templates. Click on any card below to launch the playtest playground console.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.length > 0 ? (
            data.map((item) => (
              <Link
                key={item._id}
                to={`/prompt/${item._id}`}
                className="group relative cursor-pointer w-full h-80 rounded-2xl overflow-hidden border border-stone-200/60 shadow-md hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-end"
              >
                {/* Background image with hover zoom */}
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  onError={(e) => {
                      e.target.onError = null;
                      e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                
                {/* Translucent overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent"></div>
                
                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-emerald-50/95 backdrop-blur-sm text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-100/40 shadow-sm">
                    {item.category}
                  </span>
                </div>
                
                {/* Info Footer */}
                <div className="relative z-10 p-5">
                  <h3 className="text-base font-bold text-white tracking-tight leading-tight group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-[10px] text-stone-300 mt-1 block font-semibold">Launch Sandbox →</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-stone-500 bg-white/40 border border-dashed border-stone-200/80 rounded-2xl">
              <span className="text-sm font-bold text-stone-850">Your Collection is Empty</span>
              <span className="text-xs text-stone-500 mt-1 max-w-xs text-center leading-relaxed">
                You haven't unlocked any prompts yet. Head over to pricing plans to buy credits and unlock templates.
              </span>
              <Link to="/pricing" className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all">
                Get Credits
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyCollection