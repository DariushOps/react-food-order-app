import { use, useActionState } from "react";
import Input from "./UI/Input.jsx";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

// function manageActionForm(prevState, formData) {
//   const fullName = formData.get("full-name");
//   const email = formData.get("email");
//   const street = formData.get("street");
//   const city = formData.get("city");
//   const postalCode = formData.get("postal-code");
// }

const requestData = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = use(CartContext);
  const userProgressCtx = use(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestData
  );

  const totalPrice = cartCtx.items.reduce((totalItemsPrice, item) => {
    return totalItemsPrice + item.quantity * item.price;
  }, 0);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCart();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  const [formState, formAction, pending] = useActionState(checkoutAction, null);

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (pending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={userProgressCtx.progress === "checkout"}>
        <h2>Success!</h2>
        <p>Your order submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next a
          few minuets.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total amount : {currencyFormatter.format(totalPrice)}</p>
        <Input label="Full name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>

        {error && <Error title="Failed to send order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
