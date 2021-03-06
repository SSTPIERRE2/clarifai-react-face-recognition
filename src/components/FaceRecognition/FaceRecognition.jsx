import React from 'react';
// eslint-disable-next-line
import tachyons from 'tachyons';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, boxes = [] }) => (
  <div className='center ma'>
    <div className='absolute mt2'>
      <img alt='' id='inputImage' src={imageURL} width='500px' height='auto' />
      {boxes.map(box => (
        <div
          key={box.id}
          className='bounding-box' 
          style={{ top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}} 
        />
      ))}
    </div>
  </div>
);

export default FaceRecognition;