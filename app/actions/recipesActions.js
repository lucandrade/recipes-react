import * as constants from '../constants/actionsConstants';
import Request from '../utils/Request';

function setNavigating(state) {
    if (state) {
        return {type: constants.NAV_START};
    }

    return {type: constants.NAV_FINISH};
}

export function startNavigation() {
    return function(dispatch) {
        return dispatch(setNavigating(true));
    }
}

export function finishNavigation() {
    return function(dispatch) {
        return dispatch(setNavigating(false));
    }
}

export function nextPage() {
    return {type: constants.NEXT_PAGE_RECIPES};
}

function setFetching() {
    return {type: constants.FETCH_RECIPES};
}

function setError() {
    return {type: constants.ERROR_RECIPES};
}

function fetchedRecipes(data) {
    return {type: constants.FETCHED_RECIPES, payload: data};
}

function fetchedRecipe(recipe) {
    return {type: constants.FETCHED_RECIPE, payload: recipe};
}

export function fetchList(page=1) {
    return function(dispatch) {
        return setTimeout(() => {
            dispatch(setFetching());
            Request.get(`/recipes?page=${page}`)
                .then(response => {
                    if (response.data && response.data.payload) {
                        dispatch(fetchedRecipes(response.data.payload));
                    } else {
                        dispatch(setError());
                    }
                })
                .catch(() => {
                    dispatch(setError());
                });
        }, 10);
    }
}

export function fetchRecipe(recipeId, recipeList) {
    return function(dispatch) {
        return setTimeout(() => {
            dispatch(setFetching());
            setTimeout(() => {
                const recipe = recipeList.filter(item => item.id === recipeId);

                if (recipe.length > 0) {
                    return dispatch(fetchedRecipe(recipe[0]));
                }

                return dispatch(setError());
            }, 1000);
        }, 10);
    }
}
