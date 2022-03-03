import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import postStyles from './post-styles.module.css'

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
    <div className={`${postStyles.wrappedComponent} p-8 mb-8 `}>
      <h3 className='text-xl mb-6 font-semibold border-b border-b-slate-300 pb-4'>
        {slug? 'Related Post':'Recent Post'}
      </h3>
      {relatedPost.map(( post ) => (
        <div key={post.title} className='flex items-center w-full border-b  mb-2' >
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
