import React from 'react'
import Image from 'next/image'
import Loading from '../public/loading.gif';
const Spinner = () => {
  return (
    
      <div className=' text-center'>
                 <Image src={Loading} alt="My Image"  />
            </div>

  )
}

export default Spinner


