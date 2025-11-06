import { use } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartCtx = use(CartContext);
  const userContext = use(UserProgressContext);

  function handleShowCart() {
    userContext.showCart();
  }

  const totalCartItems = cartCtx.items.reduce((totalItems, item) => {
    return totalItems + item.quantity;
  }, 0);

  return (
    <div id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>DaruishFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </div>
  );
}
