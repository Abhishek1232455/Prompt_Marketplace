import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Pricing = () => {
  const userData = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePayment = async (plan , amount) =>{
    if (!userData?.user?._id) {
      toast.error("Please Login to Purchase a Plan");
      navigate("/login");
      return;
    }

    try {
      const stripe = await loadStripe("pk_test_51ObNMYSD8MI8srpOOBb5qmC1U0W9d2z68RRsJJn6uU6kPqyOYh7t21AAPC1qrPjBwnStI6M75LPPSSiJAN9DmQVZ00QuCUZnvu");
      const body ={
        plan: plan,
        price :amount,
        userId: userData?.user?._id
      }
      const header = {
        "Content-Type":"application/json"
      }

      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/plan/purchase`,{
        method:"POST",
        headers: header,
        body: JSON.stringify(body),
      })

      const session = await response.json();
      if (!session.id) {
        toast.error(session.message || "Checkout session generation failed.");
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId:session.id
      })

      if(result.error){
        console.error(result.error);
        toast.error("Failed to redirect to checkout gateway.");
      }
    } catch (error) {
      console.error("Payment setup error:", error);
      toast.error("An error occurred during payment initialization.");
    }
  }

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100/50 shadow-sm">
            Pricing Plans
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold mt-6 tracking-tight text-stone-900">
            Purchase Credits
          </h2>
          <p className="mt-4 text-stone-500 text-sm sm:text-base leading-relaxed">
            Acquire credits instantly to unlock high-quality engineering prompts and execute them in our live sandbox playground.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Card 1: Basic */}
          <div className="glass-card bg-white border border-stone-200/60 rounded-2xl flex flex-col p-8 transition-all hover:border-emerald-500/30 shadow-md">
            <div className="text-center pb-6 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-700">Basic Tier</h3>
              <div className="text-3xl font-extrabold text-stone-900 mt-4 flex items-center justify-center gap-1">
                <span className="text-lg text-stone-400 font-semibold">₹</span>49
              </div>
              <span className="text-[11px] text-stone-400 mt-1 block">One-time payment</span>
            </div>
            
            <div className="py-6 flex-1 flex flex-col justify-between">
              <ul className="space-y-4 mb-8 text-xs text-stone-600">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> 100 Account Credits
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Playtest up to 100 Prompts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Full Gemini Sandbox access
                </li>
                <li className="flex items-center gap-2 text-stone-400">
                  <span>✗</span> Priority developer support
                </li>
              </ul>
              
              <button 
                onClick={() => handlePayment("Basic", 49)} 
                className="w-full py-2.5 rounded-xl border border-emerald-500/30 text-emerald-600 hover:bg-emerald-600 hover:text-white bg-emerald-50 font-bold text-xs transition-all text-center"
              >
                Purchase Basic
              </button>
            </div>
          </div>

          {/* Card 2: Pro (Featured) */}
          <div className="relative glass-card bg-white border-2 border-emerald-500/50 rounded-2xl flex flex-col p-8 transition-all shadow-xl scale-105 z-10">
            {/* Most Popular Ribbon */}
            <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-emerald-600 px-3.5 py-1 rounded-full border border-emerald-400/30 shadow-md">
                Most Popular
              </span>
            </div>

            <div className="text-center pb-6 border-b border-stone-100">
              <h3 className="text-base font-bold text-emerald-700">Pro Tier</h3>
              <div className="text-3xl font-extrabold text-stone-900 mt-4 flex items-center justify-center gap-1">
                <span className="text-lg text-stone-400 font-semibold">₹</span>99
              </div>
              <span className="text-[11px] text-stone-400 mt-1 block">One-time payment</span>
            </div>
            
            <div className="py-6 flex-1 flex flex-col justify-between">
              <ul className="space-y-4 mb-8 text-xs text-stone-700">
                <li className="flex items-center gap-2 font-semibold">
                  <span className="text-emerald-600">✓</span> 250 Account Credits (Bonus!)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> Playtest up to 250 Prompts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> Premium developer templates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> Gemini 2.5 flash playground
                </li>
              </ul>
              
              <button 
                onClick={() => handlePayment("Pro", 99)} 
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all text-center shadow-md hover:shadow-emerald-600/15"
              >
                Purchase Pro
              </button>
            </div>
          </div>

          {/* Card 3: Ultimate */}
          <div className="glass-card bg-white border border-stone-200/60 rounded-2xl flex flex-col p-8 transition-all hover:border-emerald-500/30 shadow-md">
            <div className="text-center pb-6 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-700">Ultimate Tier</h3>
              <div className="text-3xl font-extrabold text-stone-900 mt-4 flex items-center justify-center gap-1">
                <span className="text-lg text-stone-400 font-semibold">₹</span>199
              </div>
              <span className="text-[11px] text-stone-400 mt-1 block">One-time payment</span>
            </div>
            
            <div className="py-6 flex-1 flex flex-col justify-between">
              <ul className="space-y-4 mb-8 text-xs text-stone-600">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> 500 Account Credits
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Infinite access & updates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Unlock premium admin cards
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span> Priority 24/7 client support
                </li>
              </ul>
              
              <button 
                onClick={() => handlePayment("Ultimate", 199)} 
                className="w-full py-2.5 rounded-xl border border-emerald-500/30 text-emerald-600 hover:bg-emerald-600 hover:text-white bg-emerald-50 font-bold text-xs transition-all text-center"
              >
                Purchase Ultimate
              </button>
            </div>
          </div>

        </div>

        {/* Footer Support Call */}
        <h5 className="text-center text-sm font-semibold text-stone-550 mt-16">
          Interested in a custom enterprise plan?{" "}
          <a href="/contact" className="text-emerald-600 hover:underline">
            Get in touch with us
          </a>
        </h5>

      </div>
    </div>
  )
}

export default Pricing