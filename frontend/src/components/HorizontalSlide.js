import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import HomeCard from './HomeCard';
import { useSelector } from 'react-redux';

const HorizontalSlide = () => {

    const promptData = useSelector((state) => state.prompts?.data) || [];

    // Display only the first 10 items
    const displayedData = promptData.slice(0, 10);

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
      };
    
      const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
      };

  return (
    <>
      <div className='relative flex items-center'>
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <div
          id='slider'
          className='w-full flex gap-1 h-full overflow-y-scroll no-scrollbar whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          { displayedData.map((item) => (
            <HomeCard key={item._id} name={item.name} image={item.imageUrl} category={item.category} price={item.price} promptDescription={item.promptDescription} promptData={item.promptData} id={item._id}/>
          ))}
        </div>
        <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
      </div>
    </>
  )
}

export default HorizontalSlide