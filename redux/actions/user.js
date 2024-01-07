import { ActionTypes } from '../actionTypes';

export const updateUserAction = (item) => {
    return {
        type: ActionTypes.UPDATE_USER_INFO,
        payload: item,
    };
};