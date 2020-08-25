import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import tachyons from 'tachyons';

const Rank = ({ name, entries }) => {
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    generateEmoji(entries);
  }, []);

  const generateEmoji = (entries) => {
    fetch(`https://9cfiqvzcfl.execute-api.us-east-1.amazonaws.com/dev/rank?rank=${entries}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(`got data`, data);
        setEmoji(data.input)
      })
      .catch(console.log)
  }

  return (
    <div>
      <div className='white f3'>
        {`${name} Your current entry count is...`}
      </div>
      <div className='white f1'>
        {entries}
      </div>
      <div className='white f3'>
        {`Rank Badge: ${emoji}`}
      </div>
    </div>
  );
}

export default Rank;