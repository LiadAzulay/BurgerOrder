import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummery.css';

const checkoutSummery = (props) => {
  return (
    <div className='CheckoutSummery'>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type='Danger' clicked={props.checkoutCanceled}>CANCEL</Button>
      <Button type='Success' clicked={props.checkoutContinued}>COUNTINUE</Button>
    </div>
  );
}

export default checkoutSummery;