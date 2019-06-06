import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Model from '../../../components/UI/Model/Model';

const withErrorHandler = (WrappedComponent, axios) => {

  return class extends Component {
    state = {
      error: null
    }
    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      })
      this.resInterceptors = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.request.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        <Aux>
          <Model
            show={this.state.error}
            modelClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Model>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }

  }
}

export default withErrorHandler;