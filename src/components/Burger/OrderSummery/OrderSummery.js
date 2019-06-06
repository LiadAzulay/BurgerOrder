import React, { Component } from 'react';
import Aux from '../../../containers/hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component {

  render() {
    const ingredientSummery = Object.keys(this.props.ingredients)
      .map(igKey => {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}
          : </span>{this.props.ingredients[igKey]}</li>
      });
    return (
      <Aux>
        <h3>Your Order!</h3>
        <p>A burger with the following ingredients</p>
        <ul>
          {ingredientSummery}
        </ul>
        <p><strong>Total price: {this.props.price} $</strong></p>
        <p>Continue to checkout?</p>
        <Button type='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
        <Button type='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  };
}

export default OrderSummery;
