export let cart = JSON.parse(localStorage.getItem('cart'));

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;

    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    const selectedQuantity = document.querySelector(`.js-quantity-${productId}`);
    let cartQuantity = Number(selectedQuantity.value);

    if (matchingItem) {
        matchingItem.quantity += cartQuantity;
    }
    else {
        cart.push({
            productId: productId,
            quantity: cartQuantity
        });
    }
    saveToStorage();
}

export function removeCartItem(productId) {
    const newCart = [];
    newCart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function itemCount() {
    document.querySelector('.js-cart-item-count').innerHTML = cart.length;
}