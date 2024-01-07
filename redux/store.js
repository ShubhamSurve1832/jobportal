import { AUTH_KEY_NAME, CART_KEY_NAME, PRICE_KEY_NAME } from '@/constants/statusCodes';
import rootReducer from './rootReducer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AES, enc, mode, pad } from 'crypto-js';

let cartValuesFromLS = [];
let priceValuesFromLs = {};
let user = null;

// Check if localStorage is available (client-side only)
if (typeof window !== 'undefined' && window.localStorage) {
    const localStorageData = localStorage.getItem(CART_KEY_NAME);
    const localStoragePriceData = localStorage.getItem(PRICE_KEY_NAME);
    const localStorageUserData = localStorage.getItem(AUTH_KEY_NAME);

    if (localStorageData !== 'undefined' && localStorageData !== null) {
        cartValuesFromLS = JSON.parse(localStorageData);
        priceValuesFromLs = JSON.parse(localStoragePriceData);
        user = JSON.parse(localStorageUserData)
    }
}

const INITIAL_STATE = {
    cart: {
        cartItems: cartValuesFromLS,
        price: {
            discountPrice: priceValuesFromLs && priceValuesFromLs.discountPrice || 0,
            totalPrice: priceValuesFromLs && priceValuesFromLs.totalPrice || 0,
        }
    },
    user: {
        user: user
    }
};
console.log("🚀 ~ file: store.js:36 ~ INITIAL_STATE:", INITIAL_STATE)
// console.log('INITIAL_STATE', INITIAL_STATE);
const store = createStore(rootReducer, INITIAL_STATE, composeWithDevTools());
store.subscribe(() => {
    const state = store.getState();
    const cartItems = state.cart.cartItems || [];
    localStorage.setItem(CART_KEY_NAME, JSON.stringify(cartItems));
});

export default store;
