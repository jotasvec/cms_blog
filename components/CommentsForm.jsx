import React, { useState, useEffect, useRef } from 'react';
import { submitComment } from "../services";



const CommentsForm = ({ slug }) => {
  
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(null);
  
  const emailElement = useRef();
  const nameElement = useRef();
  const lastNameElement = useRef();
  const commentEl = useRef();
  const storeDataEl = useRef();
  
  useEffect(() => {
    const localStorage = window.localStorage;

    nameElement.current.value = localStorage.getItem('name');
    lastNameElement.current.value = localStorage.getItem('lastName');
    emailElement.current.value = localStorage.getItem('email');
    // storeDataEl = localStorage.getItem('storeData')

  }, []);

  const handleCommentSubmission = () => {

    const { value: comment } = commentEl.current;
    const { value: name} = nameElement.current;
    const { value: lastName } = lastNameElement.current;
    const { value: email } = emailElement.current;
    const { checked: storeData } = storeDataEl.current;

 
    
    if (!comment || !name || !lastName || !email ){
      setError(true)
      console.log('comment', comment)
      console.log('name', name)
      console.log('lastName', lastName)
      console.log('email', email)
      setTimeout(() => {
        setError(false);
        emailElement.current.value = '';
        nameElement.current.value = '';
        lastNameElement.current.value = '';
        commentEl.current.value = '';
      }, 4000);
      return;
    }


    const commentObj = {
      name,
      lastName,
      email,
      comment,
      slug
    }

    

    if(storeData){
      localStorage.setItem('name', name);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('email', email);
      localStorage.setItem('storeData', storeData)
    }else{
      localStorage.removeItem('name', name);
      localStorage.removeItem('lastName', lastName);
      localStorage.removeItem('email', email);
    }

    submitComment(commentObj)
      .then((res)=>{
        setShowSuccessMessage(true);

        setTimeout(()=> {
          setShowSuccessMessage(false);
          commentEl.current.value = '';
          
        }, 3000);
      })
  } 



  

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className="text-xl mb-8 font-semibold border-b pb-4"> Submit your Comment </h3>   
        {error && <p className='text-xs text-white bg-red-500 p-3 mb-2 rounded-lg transition easy'> All fields are required.</p> } 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <input 
            className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            type="text" 
            ref={nameElement}
            name='Name'
            placeholder='Name'
          />
          <input 
            className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            type="text" 
            ref={lastNameElement}
            name='LastName'
            placeholder='Last Name'
          />
          <input 
            className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            type="email" 
            ref={emailElement}
            name='email'
            placeholder='Email'
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea 
            className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
            ref={commentEl} 
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
              ref={storeDataEl}
              value='false'
              />
            <label className="text-gray-500 cursor-pointer ml-2">
              Save my data for the next comment.
            </label>
          </div>
        </div>
        <div className="mt-8 flex justify-start">
          <button 
            type="button" 
            className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-indigo-500 shadow-lg shadow-indigo-500/30 text-lg rounded-lg text-white px-8 py-2 cursor-pointer'
            onClick={handleCommentSubmission}>
              Submit Comment
            </button>
            {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500 transition easy"> 
              Your comment has been submited for review
            </span> }
        </div>
    </div>
  );
};

export default CommentsForm;
