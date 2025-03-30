import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = () => {
  return (
    <div className='flex flex-col items-center justify-center my-auto'>
       <PropagateLoader size={40} color="#9736d3"/>
    </div>
  )
}

export default Loader