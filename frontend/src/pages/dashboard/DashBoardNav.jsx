import React from 'react'
import { Link } from 'react-router'

const DashBoardNav = () => {
  return (
    <div className='flex flex-col items-center'>
    {/* Heading */}
    <nav className='flex w-full justify-between p-4 bg-gray-200'>
      <Link to="/dashboard" className='text-md lg:text-3xl font-light font-serif'>Az Gadgets</Link>
      <div className='flex font-light font-serif text-sm lg:text-xl space-x-4'>
        <Link to="/dashboard/all-orders">Orders</Link>
        <Link to="/dashboard/view-all-users">users</Link>
        <Link to="/dashboard/view-all-products">products</Link>
      </div>
    </nav>
  </div>
  )
}

export default DashBoardNav