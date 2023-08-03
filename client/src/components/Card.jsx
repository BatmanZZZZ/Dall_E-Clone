import React, { useState } from 'react';
import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className='rounded-xl relative shadow-card hover:shadow-card-hover card'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />

      <div
        className={`max-h-[94.5%] absolute right-0 left-0 bottom-0 m-2 p-4 bg-[#10131f] rounded-md ${
          isHovered ? 'visible' : 'invisible'
        }`}
      >
        <p className='text-white text-md'>{prompt}</p>

        <div className='mt-5 flex justify-between items-center gap-3'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 text-white
            flex justify-center items-center text-sm font-bold'>
              {name[0]}
            </div>
            <p className='text-white text-sm'>{name}</p>

          </div>
          <button type="button" onClick={()=>downloadImage(_id,photo)} className='outline-none bg-transparent border-none'>
           <img src={download} alt="download" className='h-6 w-6 invert object-contain' />
          </button>

        </div>
      </div>

    </div>
  );
};

export default Card;
