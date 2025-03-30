import React from 'react'
import banner from "../assets/banner.jpg"

const Banner = () => {
  return (
    <section className='flex flex-col-reverse items-center gap-6 justify-between p-2 lg:flex-row'>
        <div className='flex w-full flex-col mx-auto items-center justify-center  bg-gradient-to-r from-purple-300 to-blue-300 text-center space-y-6  p-4 rounded-lg h-auto lg:h-140'>
            <h1 className='text-4xl md:text-5xl lg:text-8xl font-bold'>New Arrivals</h1>
            <h3 className='text-3xl font-semibold'>Latest Gadgets, fresh in stock! <span className='text-purple-500'>Browse Now</span></h3>
            <h3 className='text-3xl font-semibold'>Stay Ahead With Cutting-Edge Tech!</h3>
        </div>
        <div className='rounded-lg items-center justify-center w-full'>
            <img src={banner} alt="banner image" className='object-cover rounded-xl  h-auto lg:h-140 w-full' />
        </div>
    </section>
  )
}

export default Banner