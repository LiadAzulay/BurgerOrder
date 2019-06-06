import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../containers/hoc/Aux/Aux';

const sideDrawer = (props) => {
  let attachedClasses = ['SideDrawer', 'Close'];
  if (props.show) {
    attachedClasses = ['SideDrawer', 'Open'];
  }
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <span className='Logo'><Logo height='11%' /></span>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
