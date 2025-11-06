import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext";
import { use } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const userProgressCtx = use(UserProgressContext);

  const cartCtx = use(CartContext);
  const totalPrice = cartCtx.items.reduce((totalItemsPrice, item) => {
    return totalItemsPrice + item.quantity * item.price;
  }, 0);

  function handleHideCart() {
    userProgressCtx.hideCart();
  }
  function handleShowCheckout() {
    userProgressCtx.showCheckout();
  }

  function handleAddItem(item) {
    cartCtx.addItem(item);
  }
  function handleRemoveItem(id) {
    cartCtx.removeItem(id);
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => handleAddItem(item)}
            onDecrease={() => handleRemoveItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleHideCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleShowCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
