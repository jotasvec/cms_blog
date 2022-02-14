import React from 'react';

const PostDetail = ( {post}) => {
  return (
        <div className='bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
            <div className="relative overflow-hidden shadow-md mb-6">
                <img className='object-top h-full w-full rounded-t-lg'
                    src={post.featureImage.url} alt={post.title} 
                    />
                <div className="px-4 lg:px-0">
                    
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
