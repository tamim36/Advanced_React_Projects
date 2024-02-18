import { createContext, useReducer, useState } from 'react'
import { DUMMY_PRODUCTS} from '../dummy-products';


export const CartContext = createContext({
    items: [],
    onAddItemToCart: () => {},
    onUpdateCartItemQuantity: () => {}
})

const shoppingCartReducer = (state, action) => {
    if (action.type === 'add-item'){
      const updatedItems = [...state.items];
    
          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
            updatedItems.push({
              id: action.payload.id,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
    
          return {
            items: updatedItems,
          };
    }
    if (action.type === 'update-item'){
      const updatedItems = [...state.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += action.payload.amount;
    
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
            updatedItems[updatedItemIndex] = updatedItem;
          }
    
          return {
            items: updatedItems,
          };
    }

    return state
}

const CartContextProvider = ({children}) => {
    const [ shoppingCartState, shoppingCartDispatch ] = 
        useReducer(shoppingCartReducer, {
        items: [],
      })
    
      function handleAddItemToCart(id) {
        shoppingCartDispatch({
          type: 'add-item',
          payload: {
            id
          }
        })
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
          type: 'update-item',
          payload: {
            productId,
            amount
          }
        })
      }
    
      const cartCtxContextValue = {
        items: shoppingCartState.items,
        onAddItemToCart: handleAddItemToCart,
        onUpdateCartItemQuantity: handleUpdateCartItemQuantity
      }

  return (
    <CartContext.Provider value={cartCtxContextValue}>
        {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider