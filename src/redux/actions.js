export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";

export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";

export const APPLY_COUPON = "APPLY_COUPON";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const increaseQuantity = (id) => ({
  type: INCREASE_QUANTITY,
  payload: id,
});

export const decreaseQuantity = (id) => ({
  type: DECREASE_QUANTITY,
  payload: id,
});

export const addToWishlist = (product) => ({
  type: ADD_TO_WISHLIST,
  payload: product,
});

export const removeFromWishlist = (id) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: id,
});

export const applyCoupon = (coupon) => ({
  type: APPLY_COUPON,
  payload: coupon,
});