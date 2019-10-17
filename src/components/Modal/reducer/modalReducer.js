import {MODAL_WINDOW_TYPES} from "../../../actions/ModalWindowAction";

const initialState = {
    isOpen: false,
    data: [],
    error: ''
};

function modalWindowReducer(state = initialState, action) {
    switch (action.type) {
        case MODAL_WINDOW_TYPES.GET_MODAL_WINDOW_SETTINGS:
            return Object.assign({}, state);
        case MODAL_WINDOW_TYPES.TOGGLE_MODAL_WINDOW:
            return Object.assign({}, state, {
                isOpen: action.isOpen,
                data: action.data
            });
        default:
            return state;
    }
}


const ModalWindowReducer = {
    modalWindowSettings: modalWindowReducer
};

export default ModalWindowReducer;
