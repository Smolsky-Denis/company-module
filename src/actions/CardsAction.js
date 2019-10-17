export const CARDS_TYPES = {
    CLEAR_EMPLOYEE: 'CLEAR_EMPLOYEE',
    GET_TOGGLE_VALUE: 'GET_TOGGLE_VALUE',
    GET_SEARCH_VALUE: 'GET_SEARCH_VALUE',
    GET_SELECTED_VALUE: 'GET_SELECTED_VALUE'
};


export function clearEmployeeCard() {
    return (dispatch) => dispatch({
        type: CARDS_TYPES.CLEAR_EMPLOYEE
    })
}

export function getToggle(toggleValue) {
    return (dispatch) => {
        dispatch({
            type: CARDS_TYPES.GET_TOGGLE_VALUE,
            toggleValue
        })
    }
}

export function getSearchValue(searchValue, listChange) {
    return (dispatch) => {
        let searchValueData = searchValue.value;
        dispatch({
            type: CARDS_TYPES.GET_SEARCH_VALUE,
            searchValueData
        });
        listChange(searchValueData);
    }
}

export function getSelectedValue(selectedFullZipCode, selectedZipCodeId) {
    return (dispatch) => {
        dispatch({
            type: CARDS_TYPES.GET_SELECTED_VALUE,
            selectedFullZipCode,
            selectedZipCodeId
        });
    }
}
