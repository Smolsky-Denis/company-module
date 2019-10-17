import {successUpdate} from "../services/constants";
import {getRequest, postRequest} from "../services/utils";

export const CASH_BOX_CARD_TYPES = {
    SET_CASH_BOXES: 'SET_CASH_BOXES',
    CREATE_CASH_BOX: 'CREATE_CASH_BOX',
    GET_CASH_BOX_BY_ID: 'GET_CASH_BOX_BY_ID',
    UPDATE_CASH_BOX: 'UPDATE_CASH_BOX',
    CLEAR_CASH_BOX: 'CLEAR_CASH_BOX'
};

export function clearCashBox() {
    return (dispatch) => dispatch({
        type: CASH_BOX_CARD_TYPES.CLEAR_CASH_BOX
    })
}

export function getCashBoxList(cashBoxListRequest) {
    return (dispatch) => postRequest('/company/rest/internal/cashbox/all', cashBoxListRequest)
        .then(cashBoxList => dispatch({
        type: CASH_BOX_CARD_TYPES.SET_CASH_BOXES,
        cashBoxList: cashBoxList.content
    }))
}

export function createCashBox(createCashBoxData, redirectToEdit) {
    return (dispatch) => postRequest('/company/rest/internal/cashbox/create', createCashBoxData)
        .then((cashBoxData) => {
        redirectToEdit(cashBoxData.id);
        dispatch({
            type: CASH_BOX_CARD_TYPES.CREATE_CASH_BOX,
            cashBoxData
        })
    })
}

export function getGetCashBoxById(cashBoxId) {
    return (dispatch) => getRequest('/company/rest/internal/cashbox/' + cashBoxId)
        .then((cashBoxDataById) => dispatch({
        type: CASH_BOX_CARD_TYPES.GET_CASH_BOX_BY_ID,
        cashBoxDataById
    }))
}

export function updateCashBox(updateCashBoxData) {
    return (dispatch) => postRequest('/company/rest/internal/cashbox/update', updateCashBoxData)
        .then(updateCashBoxData => {
        alert(successUpdate);
        return dispatch({
            type: CASH_BOX_CARD_TYPES.UPDATE_CASH_BOX,
            updateCashBoxData
        })
    })
}




