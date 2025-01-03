import { cart } from "../../data/cart.js";

export function renderPayment() {
  let cartQuantity;
  let paymentSummary = '';

  cart.forEach(cartItem => {
    cartQuantity = cartItem.quantity;
  });

  paymentSummary =
    `
            <div class="payment-summary-title">
              Order Summary
            </div>
    
            <div class="payment-summary-row">
              <div>Items (${cartQuantity || 0}):</div>
              <div class="payment-summary-money">$42.75</div>
            </div>
    
            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$4.99</div>
            </div>
    
            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$47.74</div>
            </div>
    
            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$4.77</div>
            </div>
    
            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$52.51</div>
            </div>
    
            <button class="place-order-button button-primary js-place-order">
              Place your order
            </button>
    `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummary;

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: cart
      })
    });
    const order = await response.json()
    console.log('order :>> ', order);
    window.location.href = 'orders.html';
  });
}