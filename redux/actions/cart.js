import { ActionTypes } from '../actionTypes';

export const addToCartAction = (item) => {
    return {
        type: ActionTypes.ADD_TO_CART,
        payload: item,
    };
};

export const removeFromCartAction = (item) => {
    return {
        type: ActionTypes.REMOVE_FROM_CART,
        payload: item,
    };
};

export const getCartItemsCount = () => {
    return {
        type: ActionTypes.GET_CART_ITEMS_COUNT,
    };
}

export const setSimilarCoursesAction = (item) => {
    return {
        type: ActionTypes.SET_SIMILAR_COURSES,
        payload: item,
    };
}

export const setCurrentCourseAction = (item) => {
    return {
        type: ActionTypes.SET_CURRENT_COURSE,
        payload: item,
    };
}

// actions.js
export const fetchCartProducts = () => {
    return async (dispatch) => {
        try {
            // Make the API call to fetch cart products from the database
            const response = await fetch('/api/cart');

            if (!response.ok) {
                throw new Error('Failed to fetch cart products');
            }

            const cartProducts = await response.json();

            dispatch({
                type: ActionTypes.FETCH_CART_PRODUCTS_SUCCESS,
                payload: cartProducts,
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.FETCH_CART_PRODUCTS_FAILURE,
                payload: error.message,
            });
        }
    };
};
