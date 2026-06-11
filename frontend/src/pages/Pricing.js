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
    <div>

<section className="py-20 relative z-40 ">
  <div>
    <div className="mx-auto max-w-2xl sm:text-center">
      <span className="font-medium text-gray-400 tracking-widest">our price</span>
      <h2 className="md:text-5xl text-3xl font-medium tracking-tight mt-7">Price Plans</h2>
      <div className="w-10 mx-auto mt-5 bg-gradient-to-r from-cyan-500 to-blue-500 h-[2px]" />
      <p className="mt-6 text-xl/8 text-gray-600 dark:text-gray-400">Choose the plan that suits your needs best and enjoy the creative Work.</p>
    </div>
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 2xl:px-28 mt-20">
      
    <div className="flex flex-col border border-gray-300 rounded-xl overflow-hidden dark:border-gray-700">
        <div className="text-center pt-10">
          <h5 className="text-xl font-semibold">Basic</h5>
          <h2 className="text-5xl mt-8 mb-3 items-center align-middle">
            <sup className="text-2xl align-middle">₹</sup>49
          </h2>
        </div>
        <div className="p-10">
          <ul className="mb-10 text-center">
            <li className="my-4">
              <h5 className="font-medium dark:text-gray-300">100 Credits</h5>
            </li>
            <li>
              <h5 className="font-medium dark:text-gray-300">Lorem ipsum dolor sit amet</h5>
            </li>
          </ul>
          <div className="flex justify-center">
            <a onClick={()=>handlePayment("Basic",49)} className="py-3 px-6 cursor-pointer font-medium border rounded-md border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-500">Get Basic</a>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="relative z-20">
        <div className="absolute top-0 inset-x-0">
          <div className="flex justify-center">
            <span className="text-xs font-medium uppercase border border-gray-700 text-white bg-black px-2 py-1 rounded-md -mt-3">most popular</span>
          </div>
        </div>
        <div className="group">
          <div className="border rounded-xl border-gray-300 bg-white dark:border-gray-700 dark:bg-neutral-900">
            <div className="text-center">
              <div className="flex flex-col">
                <div className="text-center pt-10">
                  <h5 className="text-xl font-semibold">Pro</h5>
                  <h2 className="text-5xl mt-8 mb-3 items-center align-middle">
                    <sup className="text-2xl align-middle">₹</sup>99
                  </h2>
                </div>
                <div className="p-10">
                    <ul className="mb-10 text-center">
                      <li className="my-4">
                        <h5 className="font-medium dark:text-gray-300">250 Credits</h5>
                      </li>
                      <li>
                        <h5 className="font-medium dark:text-gray-300">Lorem ipsum dolor sit amet</h5>
                      </li>

                    </ul>
                  <div className="flex justify-center">
                    <a onClick={()=> handlePayment("Pro",99)} className="py-3 cursor-pointer px-6 font-medium border rounded-md border-purple-500 bg-purple-500 text-white hover:bg-purple-500-800">Get Pro</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-neutral-300/30 rounded-xl dark:bg-neutral-700 h-96 left-0 top-0 w-full translate-x-2 translate-y-2 -z-10" />
        </div>
      </div>

      {/*  */}
      <div className="flex flex-col border border-gray-300 rounded-xl overflow-hidden dark:border-gray-700">
        <div className="text-center pt-10">
          <h5 className="text-xl font-semibold">Ultimate</h5>
          <h2 className="text-5xl mt-8 mb-3 items-center align-middle">
            <sup className="text-2xl align-middle">₹</sup>199
          </h2>
        </div>
        <div className="p-10">
          <ul className="mb-10 text-center">
            <li className="my-4">
              <h5 className="font-medium dark:text-gray-300">500 credits</h5>
            </li>
            <li>
              <h5 className="font-medium dark:text-gray-300">Lorem ipsum dolor sit amet</h5>
            </li>
          </ul>
          <div className="flex justify-center">
            <a onClick={()=> handlePayment("Utimate",199)} className=" cursor-pointer py-3 px-6 font-medium border rounded-md border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-all duration-500">Get Ultimate</a>
          </div>
        </div>
      </div>
    </div>
    <h5 className="text-center font-medium mt-14">lnterested in a custom plan? <a href="#" className="text-purple-500">Get in touch</a></h5>
  </div>
</section>


    </div>
  )
}

export default Pricing