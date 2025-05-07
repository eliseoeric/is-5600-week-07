@@ -49,6 +49,27 @@ const cartReducer = (state, action) => {
),
}
return updatedState

case UPDATE_ITEM_QUANTITY:
const currentItem= state.itemsById[payload._id]

if (!currentItem) {
  console.warn(`Item with ID ${payload._id} not found. Cannot update quantity.`);
  return state;
}

const updateItemState = {
  ...state,
  itemsById:{
  ...state.itemsById,
  [payload._id]:{
    ...currentItem,
    quantity: currentItem.quantity + payload.quantity,
  },
}
}

return updateItemState

default:
return state
@@ -71,13 +92,13 @@ const CartProvider = ({ children }) => {

// todo Update the quantity of an item in the cart
const updateItemQuantity = (productId, quantity) => {
// todo
dispatch({type: UPDATE_ITEM_QUANTITY,payload:{id:productId,quantity}})
}

// todo Get the total price of all items in the cart
const getCartTotal = () => {
// todo
}
const getCartTotal = () => 
getCartItems().reduce((acc, item) => acc + item.price * item.quantity, 0);


const getCartItems = () => {
return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];