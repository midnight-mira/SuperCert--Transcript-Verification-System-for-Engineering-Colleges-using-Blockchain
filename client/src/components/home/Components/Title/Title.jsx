import React from 'react'
import "./Title.css"

export default function Title({subTitle, title}) {
  return (
    <div className='title'>
       <h2>{subTitle}</h2>      
        <p>{title}</p>
        
    </div>
  )
}
