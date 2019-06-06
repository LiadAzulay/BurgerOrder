import React from 'react';
import './Burger.css';
import './BurgerIngredient/BurgerIngredient';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformIngredient = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey}/>
    });
  }).reduce((arr, el) => {return arr.concat(el)}, []);
  if (transformIngredient.length === 0 ){
    transformIngredient = <p>Please start adding ingredients!</p>
  }
  return (
    <div className='Burger'>
      <BurgerIngredient type='bread-top'/>
      { transformIngredient}
      <BurgerIngredient type='bread-buttom'/>
    </div>
  );
};

export default burger;
