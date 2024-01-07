import { ActionTypes } from "../actionTypes";

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    // console.log("🚀 ~ file: userReducer.js:8 ~ userReducer ~ action:", action)
    // console.log("🚀 ~ file: userReducer.js:9 ~ userReducer ~ state:", state)
    try {
        switch (action.type) {
            case ActionTypes.UPDATE_USER_INFO: {
                const user = action.payload;
                
                delete user['signInActivity'];
                delete user['trainings'];
                delete user['role'];

                return {
                    ...state,
                    user: { ...state.user, ...user },
                };
            }
            default:
                return state;
        }
    } catch (error) {
        console.log("🚀 ~ file: userReducer.js:7 ~ userReducer ~ error:", error);
        return state;
    }
};

export default userReducer;
