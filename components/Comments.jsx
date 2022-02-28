import React, { useState, useEffect } from 'react';
import moment from 'moment';
import parse from 'html-react-parser'
import { getComments } from "../services";



const Comments = ({ slug }) => {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug)
      .then((result) => setComments(result) );
    }, [])
  
  console.log('comments',comments);
  
  return (
    // mt-20 mb-8 p-12 relative rounded-lg bg-slate-900 bg-opacity-30
    <div className='mt-20 mb-8 p-12 relative rounded-lg bg-slate-900 bg-opacity-30'>
      <h2 className="text-2xl text-white mb-8 font-semibold border-b pb-4">
        Peeps Comments
      </h2>
      {
        comments.length > 0 && (
          <div>
            {
              comments.map((comment) => (
                <div key={comment.createdAt} className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 ' >
                  <h3>{comment.name} {comment.lastName} </h3>
                  <h4>{comment.email}</h4>
                  <span>{ moment(comment.createdAt).format('DD MM, YYYY') }</span>
                  <p>{parse(comment.comment)}</p>

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
