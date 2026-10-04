import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  APPLY_COUPON,
} from "./actions";

const initialState = {
  cart: [],
  wishlist: [],
  discount: 0,
  coupon: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
          },
        ],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case INCREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case ADD_TO_WISHLIST: {
      const exists = state.wishlist.some(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        return state;
      }

      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    }

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "APPLY_COUPON": {
      const code = action.payload;

      // Missing or invalid coupon
      if (!code) {
        return {
          ...state,
          coupon: null,
          discount: 0,
        };
      }

      // Valid coupons
      if (code === "SAVE10") {
        return {
          ...state,
          coupon: code,
          discount: 10,
        };
      }

      if (code === "SAVE20") {
        return {
          ...state,
          coupon: code,
          discount: 20,
        };
      }

      // Invalid coupon
      return {
        ...state,
        coupon: null,
        discount: 0,
      };
    }

    default:
      return state;
  }
};

export default reducer;