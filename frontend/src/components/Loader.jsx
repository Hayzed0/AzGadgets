import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = () => {
  return (
    <div className='flex flex-col items-center place-content-center justify-center my-auto mt-20'>
       <PropagateLoader size={20} color="#9736d3"/>
    </div>
  )
}

export default Loader