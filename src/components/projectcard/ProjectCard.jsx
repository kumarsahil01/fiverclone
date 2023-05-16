import React from 'react'
import './ProjectCard.scss'
import { Link } from 'react-router-dom'
const ProjectCard =({item}) => {
    return (
      <div className=' projectcard'>
        <Link to='/' className='link'>
          <img src={item.img} alt="" />
          <div className='info'>
          <img src={item.pp} alt="" />
          <div className="texts">
          <span>{item.username}</span>
            <h2>{item.cat}</h2>
          
          </div>
          </div>
          </Link>
        
      </div>
    )
  }

export default ProjectCard
