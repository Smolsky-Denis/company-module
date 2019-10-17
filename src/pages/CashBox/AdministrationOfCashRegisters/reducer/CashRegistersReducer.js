import {CASH_BOX_CARD_TYPES} from "../../../../actions/CashBoxAction";

const InitialState = {
    cashBoxList: []
};

function cashRegisterInfoReducer(state = InitialState, action) {
    switch (action.type) {
        case CASH_BOX_CARD_TYPES.SET_CASH_BOXES:
            return{
                ...state,
                cashBoxList: action.cashBoxList
            };
        default: return state;
    }
}

const CashRegisterInfoReducer = {
    cashRegistersData: cashRegisterInfoReducer
};

export default CashRegisterInfoReducer;
