import * as constants from '../constants/actionsConstants';

let list;
const initialState = {
    list: [],
    page: 0,
    recipe: {},
    fetched: false,
    fetching: false,
    error: null,
};

export default function recipes(state = initialState, action) {
    switch (action.type) {
        case constants.FETCH_RECIPES:
            return {...state, error: null, fetching: true};
        case constants.ERROR_RECIPES:
            return {...state, error: true};
        case constants.FETCHED_RECIPES:
            list = state.list.concat(action.payload.data);
            return {
                ...state,
                list,
                page: action.payload.current_page || 0,
                fetching: false,
                error: null,
                fetched: true,
            };
        case constants.NEXT_PAGE_RECIPES:
            // list = nextPage(state.list);
            return {
                ...state
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
