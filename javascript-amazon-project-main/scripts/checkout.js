import { renderOrder } from "./checkout/renderOrder.js";
import { renderPayment } from "./checkout/renderPayment.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';


Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('aaaa');
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then(() => {
    renderOrder();
    renderPayment();
});

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('aaaa');
//     });
// }).then((v1) => {
//     console.log('v1 :>> ', v1);
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     });
// }).then(() => {
//     renderOrder();
//     renderPayment();
// });

// loadProducts(() => {
//     loadCart(() => {
//         renderOrder();
//         renderPayment();
//     });
// });



