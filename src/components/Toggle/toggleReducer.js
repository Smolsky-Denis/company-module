import {CARDS_TYPES} from "../../actions/CardsAction";

const InitialState = {
    toggleValue: false
};

function toggleInfoReducer(state = InitialState, action) {
    switch (action.type) {
        case CARDS_TYPES.GET_TOGGLE_VALUE:
            return {
                ...state,
                toggleValue: action.toggleValue
            };
        default:
            return state;
    }
}
const ToggleInfoReducer = {
    toggleComponent: toggleInfoReducer
};

export default ToggleInfoReducer;
