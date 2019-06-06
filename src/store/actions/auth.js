import * as ActionTypes from './ActionTypes';
import axios from 'axios';
export const authStart = () => {
  return {
    type: ActionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: ActionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: ActionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: ActionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}
export const authFail = (error) => {
  return {
    type: ActionTypes.AUTH_FAIL,
    error: error
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};

export const auth = (email, password, isSignup) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true
  }
  return dispatch => {
    dispatch(authStart());
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAdBEgh7bK8Ay2HHtnGubmmkh4fc6MQu5Y';

    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAdBEgh7bK8Ay2HHtnGubmmkh4fc6MQu5Y';
    }
    axios.post(url, authData)
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      })
  };
};
