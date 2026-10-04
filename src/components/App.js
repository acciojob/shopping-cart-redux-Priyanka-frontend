import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  addToWishlist,
  removeFromWishlist,
  applyCoupon,
} from "../redux/actions";

import "./../styles/App.css";

const products = [
  {
    id: 1,
    name: "Blue Denim Shirt",
    category: "SHIRT",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
  },
  {
    id: 2,
    name: "Red Hoodie",
    category: "HOODIE",
    price: 2599,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
  },
  {
    id: 3,
    name: "Navy T-Shirt",
    category: "T-SHIRT",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
  },
  {
    id: 4,
    name: "Black Chino Pants",
    category: "CHINO PANTS",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400",
  },
];

function App() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const discount = useSelector((state) => state.discount);
  const coupon = useSelector((state) => state.coupon);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountAmount = (subtotal * discount) / 100;

  const total = subtotal - discountAmount;

  return (
    <div className="app">
      <header className="header">
        <h1>Shopping Cart</h1>
      </header>

      <main>
        <section className="products-section">
          <h2>All Products</h2>

          <p className="subtitle">
            All the products available to order
          </p>

          <div className="products-grid">
            {products.map((product) => {
              const isWishlisted = wishlist.some(
                (item) => item.id === product.id
              );

              return (
                <div className="product-card" key={product.id}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />

                  <div className="product-info">
                    <h3>{product.name}</h3>

                    <p className="category">
                      {product.category}
                    </p>

                    <p className="price">
                      Rs {product.price}
                    </p>

                    <button
                      className="cart-button"
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add To Cart
                    </button>

                    <button
                      className={`wishlist-button ${
                        isWishlisted ? "active" : ""
                      }`}
                      onClick={() =>
                        isWishlisted
                          ? dispatch(
                              removeFromWishlist(product.id)
                            )
                          : dispatch(addToWishlist(product))
                      }
                    >
                      {isWishlisted
                        ? "Remove Wishlist"
                        : "Wishlist"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="cart-section">
          <h2>Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h3>{item.name}</h3>

                  <p>Rs {item.price}</p>

                  <div className="quantity">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="cart-summary">
            <p>
              Subtotal: <strong>Rs {subtotal}</strong>
            </p>

            <div className="coupon">
              <input
                id="coupon"
                type="text"
                placeholder="Enter coupon"
              />

              <button
                onClick={() => {
                  const value =
                    document.getElementById("coupon").value;

                  dispatch(applyCoupon(value));
                }}
              >
                Apply
              </button>
            </div>

            {coupon && (
              <p className="coupon-success">
                Coupon {coupon} applied - {discount}% off
              </p>
            )}

            <p>
              Discount: <strong>Rs {discountAmount}</strong>
            </p>

            <h2>Total: Rs {total}</h2>
          </div>
        </section>

        <section className="wishlist-section">
          <h2>Wishlist</h2>

          {wishlist.length === 0 ? (
            <p>Your wishlist is empty.</p>
          ) : (
            <div className="wishlist-grid">
              {wishlist.map((item) => (
                <div className="wishlist-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h3>{item.name}</h3>
                    <p>Rs {item.price}</p>

                    <button
                      onClick={() =>
                        dispatch(addToCart(item))
                      }
                    >
                      Add To Cart
                    </button>

                    <button
                      onClick={() =>
                        dispatch(removeFromWishlist(item.id))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;