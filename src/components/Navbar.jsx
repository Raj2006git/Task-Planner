import React from 'react'

const Navbar = ({ tasks }) => {
  return (
    <div className='bg-blue-500 text-white flex justify-between p-3 items-center'>
        <div className='cursor-pointer'>
            <span className='font-bold font-marker text-2xl'>Task Manager</span>
        </div>
      <ul className='flex justify-evenly w-[40%] font-indie font-bold text-lg cursor-pointer'>
        <li>Home</li>
        <li>Your Tasks
            <span className='bg-red-600 text-white rounded-full p-1 px-2 ml-1 text-sm'>{tasks.filter(task => !task.isCompleted).length}</span>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
