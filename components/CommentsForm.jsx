import React, { useState, useEffect, useRef } from 'react';
import {  submitComment } from "../services";



const CommentsForm = ({ slug }) => {
  const localStorage = window.localStorage;

  const [error, setError] = useState(false);
  const [localData, setLocalData] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);
  
  const emailElement = useRef({});
  const nameElement = useRef({});
  const lastNameElement = useRef({});
  const commentEl = useRef({});
  
  useEffect(() => {

    nameElement.current.value = localStorage.getItem('name');
    lastNameElement.current.value = localStorage.getItem('lastName');
    emailElement.current.value = localStorage.getItem('email');

  }, [])

  const handleCommentSubmission = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name} = nameElement.current;
    const { value: lastName } = lastNameElement.current;
    const { value: email } = emailElement.current;
    const { checked: localData } = localData.current;

 
    
    if (!comment || !name || !lastName || !email ){
      setError(true)
      return;
    }

    const commentObj = {
      name,
      lastName,
      email,
      comment,
      slug
    }

    if(localData){
      localStorage.setItem('name', name);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('email', email);
    }else{
      localStorage.removeItem('name', name);
      localStorage.removeItem('lastName', lastName);
      localStorage.removeItem('email', email);
    }

    submitComment(commentObj)
      .then((res)=>{
        setShowSuccessMessage(true);

        setTimeout(()=> {
          setShowSuccessMessage(false)
        }, 3000);
      })
  } 



  

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className="text-xl mb-8 font-semibold border-b pb-4"> Comments </h3>   
        {error && <p className='text-xs text-white bg-red-500'> All fields are required.</p> } 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <input 
            className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            type="text" 
            href={nameElement}
            name='Name'
            placeholder='Name'
          />
          <input 
            className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            type="text" 
            href={lastNameElement}
            name='LastName'
            placeholder='Last Name'
          />
          <input 
            className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            type="email" 
            href={emailElement}
            name='Email'
            placeholder='Email'
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea 
            className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            href={commentEl} 
            name='comment'
            placeholder='comment...'
            />
        </div>
        <div className='grid grid-cols-1 gap-4 mb-4'>
          <div>
            <input 
              type="checkbox" 
              name="storeData" 
              id="storeData" 
              href={localData}
              value='false'
              />
            <label className="text-gray-500 cursor-pointer ml-2">
              Save my data for the next comment.
            </label>
          </div>
        </div>
        <div className="mt-8">
          <button 
            type="button" 
            className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-lg text-white px-8 py-3 cursor-pointer'
            onClick={handleCommentSubmission}>
              Submit Comment
            </button>
            {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500"></span> }
        </div>
    </div>
  );
};

export default CommentsForm;
