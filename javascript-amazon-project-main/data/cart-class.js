class Cart {
    cartItems;
    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem('cart-class'));
    }

    saveToStorage() {
        localStorage.setItem('cart-class', JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
        this.cartItems.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        });

        const selectedQuantity = document.querySelector(`.js-quantity-${productId}`);

        let cartQuantity = Number(selectedQuantity);

        if (matchingItem) {
            matchingItem.quantity += cartQuantity;
        }
        else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1',
            });
        }
        // document.querySelector('.js-cart-quantity').innerHTML = this.itemCount();
        this.saveToStorage();
    }

    removeCartItem(productId) {
        const newCart = [];
        newCart.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        this.saveToStorage();
    }

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
}

const cart = new Cart();
cart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
cart.saveToStorage();
cart.loadFromStorage();


console.log('cart :>> ', cart.cartItems);

