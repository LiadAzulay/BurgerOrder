import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Button from '../../components/UI/Button/Button';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import {checkValidity} from '../../shared/utility';

import './DataContent.css';

class DataContent extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your email'
        },
        value: '',
        validation: { required: false },
        valid: true,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', dispalyValue: 'Feastest' },
            { value: 'regular', dispalyValue: 'Regular' },
            { value: 'cheapest', dispalyValue: 'Cheapest' },
          ]
        },
        value: 'fastest',
        validation: { required: false },
        valid: true,
      },
    },
    formIsValid: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, // Not recommended in real production,calculate price in server
      orderData: formData,
      userId: this.props.userId,
    }
    this.props.onOrderBurger(order, this.props.token);
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid =
      checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
  }

  render() {
    const formEelementArray = [];
    for (let key in this.state.orderForm) {
      formEelementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <div>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandler}>
          {formEelementArray.map(formElement => (
            <Input key={formElement.id} elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value} invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation} touched={formElement.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)} />
          ))}
          <Button type='Success' >ORDER</Button>
        </form>
      </div>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className='DataContent'>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(DataContent, axios));
