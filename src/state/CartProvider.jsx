const { payload } = action;
  switch (action.type) {
    case ADD_ITEM:
      console.log({state, action})
      const newState = {
        ...state,
        itemsById: {
@@ -34,6 +33,7 @@ const cartReducer = (state, action) => {
        // Use `Set` to remove all duplicates
        allItems: Array.from(new Set([...state.allItems, action.payload._id])),
      };
      console.log({ newState })
      return newState
    case REMOVE_ITEM:
      const updatedState = {
@@ -49,7 +49,20 @@ const cartReducer = (state, action) => {
        ),
      }
      return updatedState

    case UPDATE_ITEM_QUANTITY:
      const currentItem = state.itemsById[payload._id]
      const updatedItemState = {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...currentItem,
            quantity: currentItem.quantity + payload.quantity,
          },
        },
      }
      return updatedItemState

    default:
      return state
  }
@@ -70,8 +83,8 @@ const CartProvider = ({ children }) => {
  }

  // todo Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    // todo
  const updateItemQuantity = (product, quantity) => {
    // todo 
  }

  // todo Get the total price of all items in the cart
@@ -87,6 +100,7 @@ const CartProvider = ({ children }) => {
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        allItems: state.allItems,
        addToCart,
        updateItemQuantity,
        removeFromCart,
@@ -98,6 +112,4 @@ const CartProvider = ({ children }) => {
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart } 
export { CartProvider, CartContext }