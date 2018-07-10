import React from 'react';
// eslint-disable-next-line
import tachyons from 'tachyons';

const Rank = ({ name, entries }) => (
  <div>
    <div className='white f3'>
      {`${name} Your current entry count is...`}
    </div>
    <div className='white f1'>
      {entries}
    </div>
  </div>
);

export default Rank;