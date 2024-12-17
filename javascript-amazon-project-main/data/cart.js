export const cart = [];

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