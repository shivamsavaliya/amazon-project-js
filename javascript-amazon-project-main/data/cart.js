export let cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    }
];

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
}

export function removeCartItem(productId) {
    const newCart = [];
    newCart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
}

export function itemCount() {
    document.querySelector('.js-cart-item-count').innerHTML = cart.length;
}