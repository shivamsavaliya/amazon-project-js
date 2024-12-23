import { addToCart, cart, loadFromStorage } from "../data/cart.js";

describe('test : addToCart', () => {
    it('adds exsiting product to cart', () => {
        // addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        // expect(cart.lenght).toEqual(0);
    });
    it('adds new product to cart', () => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});