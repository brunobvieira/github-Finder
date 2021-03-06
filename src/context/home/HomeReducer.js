import {SEARCH_USERS, SET_LOADING, CLEAR_USERS} from '../types';

export default (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: true,
                alert: null
            };
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false
            };
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        default:
            return state;
    }
}