import {CASH_BOX_CARD_TYPES} from "../../../../actions/CashBoxAction";
import {NODE_TYPES} from "../../../../actions/NodeAction";
import {USER_PROFILE_TYPES} from "../../../../actions/UserProfileAction";


const InitialState = {
    // cashBoxData: {},
    nodeList: [],
    userProfileList: [],
    cashBoxData: {},
    updateCashBoxData: {},
    cashBoxDataById: {},
    nodeByIdData: {}
};

function CashBoxCardReducer(state = InitialState, action) {
    switch (action.type) {
        case CASH_BOX_CARD_TYPES.UPDATE_CASH_BOX:
            return {
                ...state,
                updateCashBoxData: action.updateCashBoxData
            };
        case CASH_BOX_CARD_TYPES.GET_CASH_BOX_BY_ID:
            return {
                ...state,
                cashBoxDataById: action.cashBoxDataById
            };
        case CASH_BOX_CARD_TYPES.CREATE_CASH_BOX:
            return {
                ...state,
                cashBoxData: action.cashBoxData
            };
        case NODE_TYPES.GET_ALL_NODES:
            return {
                ...state,
                nodeList: action.nodeList
            };
        case NODE_TYPES.GET_NODE_BY_ID:
            return {
                ...state,
                nodeByIdData: action.nodeByIdData
            };
        case USER_PROFILE_TYPES.GET_ALL_PROFILE_LIST:
            return {
                ...state,
                userProfileList: action.userProfileList
            };
        case CASH_BOX_CARD_TYPES.CLEAR_CASH_BOX:
            return {
                ...state,
                nodeList: InitialState.nodeList,
                userProfileList: InitialState.userProfileList,
                cashBoxData: InitialState.cashBoxData,
                updateCashBoxData: InitialState.updateCashBoxData,
                cashBoxDataById: InitialState.cashBoxDataById,
                nodeByIdData: InitialState.nodeByIdData
            };
            // case
        default:
            return state;
    }
}

const CashBoxCardInfoReducer = {
    cashBoxCard: CashBoxCardReducer
};

export default CashBoxCardInfoReducer;
