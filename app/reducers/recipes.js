import * as constants from '../constants/actionsConstants';

let list, page, newState;
const initialState = {
    list: [],
    filter: null,
    page: 0,
    total: 0,
    recipe: {},
    fetched: false,
    fetching: false,
    error: null,
};

export default function recipes(state = initialState, action) {
    switch (action.type) {
        case constants.FETCH_RECIPES:
            newState = {...state, error: null, fetching: true, filter: action.payload.filter};
            if (action.payload.page === 1) {
                newState.list = [];
            }
            return newState;
        case constants.FETCH_RECIPE:
            return {...state, error: null, fetching: true};
        case constants.SET_FILTER:
            return {...state, filter: action.payload};
        case constants.ERROR_RECIPES:
            return {...state, error: true};
        case constants.FETCHED_RECIPES:
            page = action.payload.current_page || 1;
            list = page > 1 ? state.list.concat(action.payload.data) : action.payload.data;
            return {
                ...state,
                list,
                page,
                total: action.payload.total || 0,
                fetching: false,
                error: null,
                fetched: true,
            };
        case constants.FETCHED_RECIPE:
            return {
                ...state,
                fetching: false,
                error: null,
                fetched: true,
                recipe: action.payload
            };
        default:
            return state;
    }
}
