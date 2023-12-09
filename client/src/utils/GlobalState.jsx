//createContext will be used to instantiate a new Context object.
//useContext is another React Hook that will allow us to use the state created from the createContext function.
import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

// This function creates a new context object 
const StoreContext = createContext();

// Every Context object comes with two components, a Provider and Consumer
const { Provider } = StoreContext;

//StoreProvider instantiate  initial global state with the useProductReducer() function
const StoreProvider = ({ value = [], ...props }) => {
    //every time we run this useProductReducer() function, we receive two items in return: state is up to date and dispatch which we use to update the state
    const [state, dispatch] = useProductReducer({
        products: [],
        cart:[],
        cartOpen: false,
        categories: [],
        currentCategory: "",
    })
    // confirm that everything works
    console.log(state);
    return <Provider value={[state, dispatch]}{...props} />;
}

//access the StoreContext in other components. 
const useStoreContext = () => {
    return useContext(StoreContext)
}

export { StoreProvider, useStoreContext }
