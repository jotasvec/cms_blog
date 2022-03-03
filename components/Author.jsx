import React from 'react';
import Image from "next/image";

const Author = ({author}) => {
  return (
    <div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-slate-600 bg-opacity-30'>
      <div className='absolute left-0 right-2 -top-14'>
        <Image
          unoptimized
          src={author.photo.url} 
          alt={author.name} 
          width='100px'
          height='100px'
          className='align-middle rounded-full'
          />
      </div>
      <h3 className="text-white my-4 text-xl font-bold"> {author.name} </h3>
      <p className="text-white text-lg"> {author.description.text} </p>      
    </div>
  );
};

export default Author;
