@@ -49,6 +49,21 @@ const cartReducer = (state, action) => {
),
}
return updatedState
case UPDATE_ITEM_QUANTITY:
console.log({state});
const currentItem = state.itemsById[payload._id]
const updateItemState = {
  ...state,
  itemsById:{
    ...state.itemsById,
  [payload._id]: {
    ...currentItem,
    quantity : currentItem.quantity + payload.quantity,
  },
}
}

return updateItemState;

default:
return state
@@ -71,12 +86,12 @@ const CartProvider = ({ children }) => {

// todo Update the quantity of an item in the cart
const updateItemQuantity = (productId, quantity) => {
// todo
dispatch({ type: UPDATE_ITEM_QUANTITY, payload: {_id: productId , quantity}})
}

// todo Get the total price of all items in the cart
const getCartTotal = () => {
// todo
return getCartItems().reduce((acc,item) => acc + item.price * item.quantity, 0);
}

const getCartItems = () => {