export let cart;
loadFromStorage();

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
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
            quantity: cartQuantity,
            deliveryOptionId: '1',
        });
    }

    document.querySelector('.js-cart-quantity').innerHTML = itemCount();
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
    let totalQuantity = 0;
    cart.forEach((item) => {
        totalQuantity = item.quantity;
    });
    if (!cart.length) {
        return 0;
    }
    return totalQuantity;
}
export function loadCart(fun) {
    const req = new XMLHttpRequest();

    req.addEventListener('load', () => {
        console.log(req.response);
        fun();
    });

    req.open('GET', 'https://supersimplebackend.dev/cart');
    req.send();
}