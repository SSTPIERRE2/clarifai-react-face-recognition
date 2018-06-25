import React from 'react';
// eslint-disable-next-line
import tachyons from 'tachyons';

const Navigation = ({ onRouteChange, isSignedIn }) => (
  <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
  {isSignedIn
    ? <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signout')}>
        Sign Out
      </p>
    : <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>
          Sign In
        </p>
        <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>
          Register
        </p>
      </div>
  }
  </nav>
);

export default Navigation;