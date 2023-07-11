'use client'
import React from 'react'
import Hero from '@/component/Hero/Hero'
import Card from '@/component/Card/Card'
import test from '@/assets/test.jpeg'
import Image from 'next/image'

const page = () => {
    const handleClick =()=>{
        console.log('Button clicked!');
    }
  return (
    <div>
         <Hero />
         <Card onClick={handleClick}>
            <Image src={test} alt='test' width={170} height={170} />
         </Card>
    </div>
  )
}

export default page