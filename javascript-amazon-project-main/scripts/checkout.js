import { cart, itemCount, removeCartItem } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import '../data/cart-oop.js';

let cartProductHTML = '';
let paymentSummary = '';
let productPrice = [];

document.querySelector('.js-cart-item-count').innerHTML = itemCount();

cart.forEach(
    (cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct;
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
                productPrice.push(formatCurrency(product.priceCents * cartItem.quantity));
            }

        });
        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
                deliveryOption = option;
            }
        });
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.time, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartProductHTML +=
            `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}" />

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
                </div>
            </div>
        `;
    }
);

function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.time, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const price = deliveryOption.price === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.price)} - `;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        html += `
        <div class="delivery-option">
            <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" />
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${price} Shipping
                </div>
            </div>
        </div>
        `
    });
    return html;
}

document.querySelector('.js-order-summary').innerHTML = cartProductHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeCartItem(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            document.querySelector('.js-cart-item-count').innerHTML = itemCount() || 0;
        });
    });

let cartQuantity;

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
    
            <button class="place-order-button button-primary">
              Place your order
            </button>
    `;

document.querySelector('.js-payment-summary').innerHTML = paymentSummary;
