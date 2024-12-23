import { products } from "./products.js";

function Cart() {
    const cart = {
        cartItems: undefined,
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
        },
        saveToStorage() {
            localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
        },
        addToCart(productId) {
            let matchingItem;
            this.cartItems.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });

            const selectedQuantity = document.querySelector(`.js-quantity-${productId}`);
            console.log('selectedQuantity :>> ', selectedQuantity);
            let cartQuantity = Number(selectedQuantity);

            if (matchingItem) {
                matchingItem.quantity += cartQuantity;
            }
            else {
                this.cartItems.push({
                    productId: productId,
                    quantity: cartQuantity,
                    deliveryOptionId: '1',
                });
            }
            document.querySelector('.js-cart-quantity').innerHTML = this.itemCount();
            this.saveToStorage();
        },
        removeCartItem(productId) {
            const newCart = [];
            newCart.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;
            this.saveToStorage();
        },
        itemCount() {
            let totalQuantity = 0;
            this.cartItems.forEach((item) => {
                totalQuantity = item.quantity;
            });
            if (!this.cartItems.length) {
                return 0;
            }
            return totalQuantity;
        }
    };
    return cart;
}


Cart().saveToStorage();
Cart().loadFromStorage();

Cart().cart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
console.log('cart :>> ', Cart().cart);

