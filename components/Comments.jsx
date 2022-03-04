import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser'
import { getComments } from "../services";
import postStyles from './post-styles.module.css'





const Comments = ({ slug }) => {

  const [comments, setComments] = useState([]);

  const getInitials = (name, lastName) =>{
    
    return `${name.charAt(0).toUpperCase() }${lastName.charAt(0).toUpperCase()}`
  }

  useEffect(() => {
    getComments(slug)
      .then((result) => setComments(result) );
    }, [])
  
  
  return (
    // mt-20 mb-8 p-12 relative rounded-lg bg-slate-900 bg-opacity-30
    <div className='mt-20 mb-8 p-12 relative rounded-lg bg-slate-600 bg-opacity-30'>
      <h2 className="text-2xl text-white mb-8 font-semibold border-b pb-4">
        Peeps Comments
      </h2>
      {
        comments.length > 0 && (
          <div>
            {
              comments.map((comment) => (
                <div key={comment.createdAt} className={`${postStyles.wrappedComponent} p-8 mb-8 pb-12`} >
                  <div className='border-b-2 pb-2'>
                    <div className='flex items-center'>
                      <div className='bg-amber-500 w-15 h-15 p-2 rounded-full'>
                        <p className='text-gray-500 opacity-70 text-3xl font-bold'> {getInitials(comment.name, comment.lastName)} </p>
                      </div>
  
                      <div className='flex-grow ml-2'>
                        <h3 className='text-gray-800 text-xl font-semibold' >{comment.name} {comment.lastName} </h3>
                        <div className='flex justify-between'>
                          <h4 className='text-gray-600 text-md' >{comment.email}</h4>
                          <p className='text-gray-500 font-xs'>{ moment(comment.createdAt).format('MMM DD, YYYY') }</p>
                        </div>
                      </div>

                    </div>                   
                  </div>
                  <p className='my-2 py-3 text-justify '>{parse(comment.comment)}</p>
                </div>
              ))
            }
          </div>
        )
      }
      
    </div>
  );
};

export default Comments;
