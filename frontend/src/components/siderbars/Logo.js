import React from 'react'
import { Logobutton } from '../styles/app';
import { Link } from 'react-router-dom';

const Logo = () => {
   return (
      <div className="logo">
         <Logobutton><Link to="/" >J</Link></Logobutton>
      </div>
   )
}

export default Logo
