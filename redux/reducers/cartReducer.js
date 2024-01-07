import { CART_KEY_NAME, PRICE_KEY_NAME } from "@/constants/statusCodes";
import { ActionTypes } from "../actionTypes";
import { decryptValue, encryptValue } from "@/utils";

const initialState = {
  cart: {
    cartItems: [],
    price: {
      totalPrice: 0,
      discountPrice: 0
    },
    similarCourses: [],
    currentCourse: {},
  },
};

const cartReducer = (state = initialState, action) => {
  try {
    switch (action.type) {
      case ActionTypes.ADD_TO_CART: {
        // Set In Cart variable
        action.payload.inCart = true;
        
        const newItem = action.payload;

        // Check If item present in cart
        const existingItemIndex = state.cartItems.findIndex(item => item._id === newItem._id);

        // Update InCart of similar courses.
        const updatedSimilarCourses = state.similarCourses?.map(similarCourse => {
          if (similarCourse._id === newItem._id) {
            return { ...similarCourse, inCart: true };
          }
          return similarCourse;
        });

        if (existingItemIndex !== -1) {
          return state;
        } else {
          // Update Cart State
          const updatedCart = [...state.cartItems, newItem];

          // Calculate Total Price & Discount Price, Encrypt that & Store in Cart
          const totalPrice = Math.max(Number(decryptValue(state.price.totalPrice)) + newItem.price.totalPrice, 0);
          const encryptedTotalPrice = encryptValue(totalPrice);

          const discountPrice = Math.max(Number(decryptValue(state.price.discountPrice)) + newItem.price.discountPrice, 0)
          const encryptedDiscountPrice = encryptValue(discountPrice);

          // Prepare Price Object
          let priceObject = { totalPrice: encryptedTotalPrice, discountPrice: encryptedDiscountPrice }

          // Store it to localStorage
          localStorage.setItem(CART_KEY_NAME, JSON.stringify(updatedCart));
          localStorage.setItem(PRICE_KEY_NAME, JSON.stringify(priceObject));

          return {
            ...state,
            cartItems: updatedCart,
            price: priceObject,
            similarCourses: updatedSimilarCourses,
          };
        }
      }
      case ActionTypes.REMOVE_FROM_CART: {
        // Set In Cart variable
        action.payload.inCart = false;

        const newItem = action.payload;
        const itemId = action.payload._id;
        const updatedCart = state.cartItems.filter(item => item._id !== itemId);

        // Update Similar Courses
        const updatedSimilarCourses = state.similarCourses?.map(similarCourse => {
          if (similarCourse._id === newItem._id) {
            return { ...similarCourse, inCart: false };
          }
          return similarCourse;
        });

        // Updated Price Information
        const totalPrice = Math.max(Number(decryptValue(state.price.totalPrice)) - newItem.price.totalPrice, 0);
        const encryptedTotalPrice = encryptValue(totalPrice);

        const discountPrice = Math.max(Number(decryptValue(state.price.discountPrice)) - newItem.price.discountPrice, 0)
        const encryptedDiscountPrice = encryptValue(discountPrice);

        let priceObject = { totalPrice: encryptedTotalPrice, discountPrice: encryptedDiscountPrice };

        // Set All info in localStorage.
        localStorage.setItem(CART_KEY_NAME, JSON.stringify(updatedCart));
        localStorage.setItem(PRICE_KEY_NAME, JSON.stringify(priceObject));

        return {
          ...state,
          cartItems: updatedCart,
          price: priceObject,
          similarCourses: updatedSimilarCourses,
        };
      }
      case ActionTypes.GET_CART_ITEMS_COUNT: {
        const cartItems = state.cartItems || [];
        return cartItems.length;
      }
      case ActionTypes.SET_SIMILAR_COURSES: {
        const updatedCourses = action.payload.map(course => {
          const isInCart = state.cartItems.some(item => item.title.trim() === course.title.trim());
          return {
            ...course,
            inCart: isInCart,
          };
        });
        // setCourses(updatedCourses);

        // const courseArray = action.payload;

        // state.cartItems
        return {
          ...state,
          similarCourses: updatedCourses
        };
      }
      case ActionTypes.SET_CURRENT_COURSE: {
        const currentCourse = action.payload;
        return {
          ...state,
          currentCourse: currentCourse
        }
      }

      default:
        return state;
    }
  } catch (error) {
    console.log("🚀 ~ file: cartReducer.js:96 ~ cartReducer ~ error:", error)
  }
};

export default cartReducer;
