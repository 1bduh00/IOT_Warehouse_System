import React from 'react'

function RacsComd() {
  return (  
    <div className='border flex flex-col rounded md:col-span-3 shadow-sm'>
        <div className='grid grid-cols-5 py-2 grid-row-1 bg-gray-50'>
            <span className='px-3 md:px-6 col-span-2 font-medium text-sm md:text-lg'>PRODUCT NAME </span>
            <span className='px-3 md:px-6 col-span-1 font-medium text-sm md:text-lg'>RAC</span>
            <span className='px-3 md:px-6 col-span-1 font-medium text-sm md:text-lg'>DATE</span>
        </div>
        <div>
          <div className='grid grid-cols-5 py-2 grid-row-1 items-center border-top '>
            <span className='px-3 sm:px-6 text-xs sm:text-sm col-span-2 '>Apple MacBook Pro 17</span>
            <span className='px-3 sm:px-6 text-xs sm:text-sm col-span-1'>1</span>
            <span className='px-3 sm:px-6 sm:text-sm text-xs col-span-1 text-sm'>{new Date(2024, 2, 25).toISOString().slice(0, 10)}</span>
            <span className='w-fit h-fit text-center sm:text-sm text-xs px-2 py-1 rounded bg-indigo-100 text-white'>Checked</span>
          </div>
          <div className='grid grid-cols-5 py-2 grid-row-1 border-top items-center'>
            <span className='px-3 sm:px-6  text-xs sm:text-sm col-span-2 '>Magic Mouse 2</span>
            <span className='px-3 sm:px-6  text-xs sm:text-sm col-span-1'>2</span>
            <span className='px-3 sm:px-6  text-xs sm:text-sm'>{new Date(2024, 2, 25).toISOString().slice(0, 10)}</span>
            <span className='w-fit h-fit text-center sm:text-sm text-xs px-2 py-1 hover:bg-indigo-500 cursor-pointer rounded bg-indigo-600 text-white'>Confirm</span>
          </div>
        </div>

    </div>
  )
}

export default RacsComd