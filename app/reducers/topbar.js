import * as constants from '../constants/actionsConstants';

const initialState = {
    started: false,
    finished: false,
};

export default function recipes(state = initialState, action) {
    switch (action.type) {
        case constants.NAV_START:
            return {started: true, finished: false};
        case constants.NAV_FINISH:
            return {started: false, finished: true};
        default:
            return state;
    }
}
