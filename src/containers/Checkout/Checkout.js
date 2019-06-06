import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import DataContent from '../DataContent/DataContent';

class Checkout extends Component {

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };
  render() {
    let summery = <Redirect to='/' />;
    if (this.props.ings) {
      const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null;
      summery = <div>
        {purchaseRedirect}
        <CheckoutSummery
          ingredients={this.props.ings}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler} />
        <Route path={this.props.match.path + '/contact-data'}
          component={DataContent} /></div>;
    }
    return summery;
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
}

export default connect(mapStateToProps)(Checkout);
