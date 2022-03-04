import React from 'react'

const Button = (props) => {
  return (
    <button 
        type="button" 
        className='transition duration-500 ease hover:bg-pink-500 inline-block bg-indigo-500 shadow-lg shadow-indigo-500/30 text-lg rounded-lg text-white px-8 py-2 cursor-pointer'
        onClick={props.click}
        >
            {props.text}
    </button>
  )
}

export default Button;