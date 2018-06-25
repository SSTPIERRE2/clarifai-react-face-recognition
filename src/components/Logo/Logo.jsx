import React from 'react';
// eslint-disable-next-line
import tachyons from 'tachyons';
import Tilt from 'react-tilt';
import logo from './icons8-idea-96.png'
import './Logo.css';

const Logo = () => (
  <div className='ma4 mt0'>
    <Tilt 
      className="Tilt br2 shadow-2" 
      options={{ max: 50 }} 
      style={{ height: 150, width: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <div className="Tilt-inner pa3">
        <img style={{ height: '100px', width: '100px' }} alt='logo' src={logo} />
      </div>
    </Tilt>
  </div>
);

export default Logo;