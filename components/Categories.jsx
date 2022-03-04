import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import postStyles from './post-styles.module.css'

import { getCategories } from "../services";


const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));

  }, []);
  
  console.log('categories - ', categories)

  return (
    <div className={`${postStyles.wrappedComponent} p-8 mb-8 `}>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Categories
      </h3>
      {categories.map(( category ) => (
        <div key={category.slug} className='flex items-center w-full' >
          <Link href={`/categories/${category.slug}`} passHref>
            <span className='cursor-pointer block pb-3 mb-3'>{category.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
