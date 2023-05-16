import React from 'react'
import {Link} from 'react-router-dom'
import './CatCard.scss'

const CatCard = ({item}) => {
  return (
    <div className='catcarda'>
      <Link to='/gigs'>
        <img src={item.img} alt="" />
        <span className='desc'>{item.desc}</span>
        <span className='title'>{item.title}</span>
        </Link>
      
    </div>
  )
}

export default CatCard
