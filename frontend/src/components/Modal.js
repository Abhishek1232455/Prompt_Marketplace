import React, { useState } from 'react'
import API from '../services/API'
// import { Link } from 'react-router-dom'

const Modal = ({ setShowModal, data, userData,setData, getData }) => {

    const [loading, setLoading] = useState(false);

    const handleBuy = async () => {
        setLoading(true);

        const response = await API(`api/v1/prompt/${data._id}/buy`, {
            method: "PATCH", // or any other HTTP method
            headers: {
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();

          await setData(result.promptToPurchase);

          if(result.success){
            alert(result.message);
            getData();
            // window.location.reload();
          }else{
            alert(result.message);
          }


        setLoading(false);
        setShowModal(false);
    }

    return (
        <>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-[#1C1917]/65 backdrop-blur-sm transition-opacity"
                    onClick={() => setShowModal(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-xl mx-auto bg-[#FAF8F5] border border-stone-200/80 rounded-3xl shadow-2xl overflow-hidden">
                        <section className="overflow-hidden md:grid md:grid-cols-5 text-stone-800">
                            <img
                                alt="Prompt Cover"
                                src={data.imageUrl}
                                className="h-40 w-full object-cover md:h-full md:col-span-2"
                                onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                                }}
                            />

                            <div className="p-6 text-center sm:p-8 md:col-span-3 flex flex-col justify-center">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/40 w-max mx-auto mb-4">
                                    Confirm Purchase
                                </span>

                                <h2 className="mb-2">
                                    <span className="text-3xl font-black text-stone-900 block sm:text-4xl">
                                        {data?.price} <span className='text-lg font-bold text-amber-600 uppercase tracking-wide'>credits</span>
                                    </span>
                                    <span className="mt-2.5 block text-xs text-stone-500 font-medium">
                                        Available Balance: <span className="font-semibold text-stone-700">{userData?.userCredits} credits</span>
                                    </span>
                                </h2>

                                {Number(userData?.userCredits) >= Number(data?.price) ? (loading ?
                                    <button
                                        disabled
                                        className="mt-6 w-full py-3 rounded-xl bg-emerald-600/50 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 cursor-not-allowed shadow-sm"
                                    >
                                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Processing ...
                                    </button> :
                                    <button
                                        onClick={handleBuy}
                                        className="mt-6 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md shadow-emerald-700/10 hover:shadow-emerald-700/20 active:scale-[0.98]"
                                    >
                                        Unlock Blueprint
                                    </button>)
                                    :
                                    <div
                                        className="mt-6 w-full py-3 px-4 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 text-xs font-bold uppercase tracking-wider text-amber-850 text-center"
                                    >
                                        Insufficient Credits
                                    </div>
                                }

                                <button 
                                    onClick={() => setShowModal(false)} 
                                    className="cursor-pointer mt-4 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-stone-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal