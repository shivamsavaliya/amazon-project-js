import { cart, itemCount, removeCartItem } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let date = dayjs();
let dateFormat = date.format('dddd, MMMM D');

let cartProductHTML = '';

document.querySelector('.js-cart-item-count').innerHTML = itemCount();


cart.forEach(
    (cartItem) => {
        const productId = cartItem.productId;
        let matchingProduct;
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
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

document.querySelector('.js-order-summery').innerHTML = cartProductHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeCartItem(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            document.querySelector('.js-cart-quantity').innerHTML = itemCount();

        });
        document.querySelector('.js-cart-item-count').innerHTML = itemCount() || 0;
    });


