import React from 'react';
import './Backdrup.css';

const backdrup = (props) => (
  props.show ?
    <div className='Backdrup' onClick={props.clicked}></div>
    : null
);

export default backdrup;
