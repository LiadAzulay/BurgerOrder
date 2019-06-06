import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
];
const buildControls = (props) => (
  <div className='BuildControls'>
    <p>Current Price: {props.price} $</p>

    {controls.map(ctrl => (
      <BuildControl key={ctrl.label} label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disable[ctrl.type]} />
    ))}

    <button onClick={props.purchasing}
      className='OrderButton'
      disabled={props.purchaseble}>
      {props.isAuth ? 'ORDER NOW' : 'SIGNIN'}
    </button>
  </div>
);
export default buildControls;
