import React,{useState} from 'react'
import Image from 'next/image'


const Card = ({path,title,rank,org}) => {

  return (
    <>
      <figure className='achiever-box'>
        <div className='achiever-img resp-img-box'>
          <Image loading='lazy' src={path}fill={true} sizes='100vw' className='resp-img' alt={title} />
        </div>
        <figcaption>
          <h3 className='caption-title'>{title}</h3>
          <p>{rank}</p>
          <p>{org}</p>
        </figcaption>
      </figure>
    </>
  )
}

export default Card