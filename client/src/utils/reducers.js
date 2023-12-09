// A reducer is a function that updates state by returning a new state object and never alters the original state object.
import { useReducer } from "react";

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART
} from './actions';

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
}
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
      case UPDATE_PRODUCTS:
        return {
          ...state,
          products: [...action.products],
        };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        // currentCategory is a single value  and not an array, so there's no need to create a copy
        currentCategory: action.currentCategory,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product]
      };


    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    case REMOVE_FROM_CART:
      //filter() only keeps the items that don't match the provided _id property.
      let newState = state.cart.filter(product => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        //creates a new array, the original state should be treated as immutable.
        cart: state.cart.map(product => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        })
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: []
      }

    case TOGGLE_CART:
      return {
        ...state,
        //expect cartOpen to be the opposite of its previous value each time the action is called
        cartOpen: !state.cartOpen
      }



    // if it's none of these actions, do not update state at all and keep things the same!
    default:
      return state;
  }
};

// initializes global state object and function to update that state by runnin reducer
export function useProductReducer(initialState) {
  // this Hook is meant specifically to manage a greater level of state,
  return useReducer(reducer, initialState);
}