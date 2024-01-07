import { CART_KEY_NAME } from '../constants';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.log("🚀 ~ file: localStorage.js:11 ~ loadState ~ error:", error)
        return undefined;
    }
};

export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('cartState', serializedState);
      console.log('After saving to localStorage!');
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  };
  
