import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import HorizontalSlide from '../components/HorizontalSlide';
import CategorySlider from '../components/CategorySlider';

function Home( {setCategory}) {
  
  const promptData = useSelector((state) => state.prompts)
  
  return (
    <div>

<section
  className="relative md:bg-[url(https://www.techspot.com/articles-info/2648/images/2023-03-29-image-10.jpg)] lg:bg-[url(https://www.techspot.com/articles-info/2648/images/2023-03-29-image-10.jpg)] bg-cover bg-center hero_image"
>
  <div
    className="absolute left-0 h-full w-full  bg-gradient-to-r from-slate-50 ..."
  ></div>

  <div
    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
  >
    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Prompt Marketplace for

        <strong className="block font-extrabold text-slate-500"> Your Needs. </strong>
      </h1>

      <p className="mt-4 max-w-lg sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
        numquam ea!
      </p>

      <div className="mt-8 flex flex-wrap gap-4 text-center">
        <Link to={"categories"}

          className="block w-full rounded bg-gray-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-slate-400 focus:outline-none focus:ring active:bg-gray-500 sm:w-auto"
        >
          Get Started
        </Link>

        <Link to={"about"}

          className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-gray-700 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
</section>

    <div>
    <Slider/>
    </div>
    <HorizontalSlide promptData={promptData}/>
    <div className=' ml-12 text-3xl'>Browser by Category</div>
    <CategorySlider setCategory={setCategory} />
    </div>
  )
}

export default Home