import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';

import { getRecentPost, getSimilarPost } from "../services";



const PostWidget = ({ categories, slug }) => {

  const [relatedPost, setRelatedPost] = useState([]);

  useEffect(() => {
    if(slug){
      getSimilarPost(categories, slug)
        .then((result) => {setRelatedPost(result)});
    }else{
      getRecentPost()
        .then((result) => {setRelatedPost(result)});
    }
    console.log("related post",relatedPost);
  }, [slug]);
  

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug? 'Related Post':'Recent Post'}
      </h3>
      {relatedPost.map(( post ) => (
        <div key={post.title} className='flex items-center w-full' >
          <div className="w-16 flex-none">
            <img src={post.featureImage.url} alt={post.title} 
              className='align-middle rounded-full'
            />
  
          </div>
          <div className="flex-grow ml-4">
            <p className='text-gray-500 font-xs'> {moment(post.createdAt).format('MMM DD, YYYY')} </p>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </div>
          
        </div>
        ))}
    </div>
  );
};

export default PostWidget;
