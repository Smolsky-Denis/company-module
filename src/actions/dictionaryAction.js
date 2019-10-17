import {getRequest} from "../services/utils";

export const DICTIONARY_TYPES = {
    GET_ZIPCODE_BY_ID: 'GET_ZIPCODE_BY_ID',
    GET_ZIPCODE_LIST: 'GET_ZIPCODE_LIST',
    GET_NODE_TYPE_BY_ID: 'GET_NODE_TYPE_BY_ID',
    GET_NODE_TYPE_LIST: 'GET_NODE_TYPE_LIST',
    GET_TAX_AUTHORITY_LIST: 'GET_TAX_AUTHORITY_LIST',
    GET_TAXATION_SYSTEM_LIST: 'GET_TAXATION_SYSTEM_LIST',
    GET_LEGAL_FORM_LIST: 'GET_LEGAL_FORM_LIST'
};

export function getZipcodeById(zipcodeId) {
    return (dispatch) => getRequest('/company/rest/internal/dictionary/zipcode/' + zipcodeId)
        .then((zipcode) => dispatch({
        type: DICTIONARY_TYPES.GET_ZIPCODE_BY_ID,
        zipcode
    }))
}

export function getZipcodeList() {
    return (dispatch) => getRequest('/company_zipcode_test/rest/internal/dictionary/zipcode/all')
        .then((zipCodeList) => {
        let zipcodeList = zipCodeList.zipCodeDTOList;
        return dispatch({
            type: DICTIONARY_TYPES.GET_ZIPCODE_LIST,
            zipcodeList
        })
    })
}

export function getNodeTypeId(nodeTypeId) {
    return (dispatch) => getRequest('/company/rest/internal/dictionary/node-type/' + nodeTypeId )
        .then((nodeTypeByIdData) => {
        return dispatch({
            type: DICTIONARY_TYPES.GET_NODE_TYPE_BY_ID,
            nodeTypeByIdData
        })
    })
}

export function getNodeTypeList() {
    return (dispatch) => getRequest('/company/rest/internal/dictionary/node-type/all')
        .then((nodeTypeAll) => {
        let nodeTypeList = nodeTypeAll.nodeTypeDTOList;
        return dispatch({
            type: DICTIONARY_TYPES.GET_NODE_TYPE_LIST,
            nodeTypeList
        })
    })
}

export function getTaxAuthorityList() {
    return (dispatch) => getRequest('/company/rest/internal/dictionary/tax-authority/all')
        .then((taxAuthority) => {
            let taxAuthorityList = taxAuthority.taxAuthorityDTOList;
            return dispatch({
                type: DICTIONARY_TYPES.GET_TAX_AUTHORITY_LIST,
                taxAuthorityList
            })
        })
}

export function getTaxationSystemList() {
    return (dispatch) => getRequest('/company/rest/internal/dictionary/taxation-system/all')
        .then((taxationSystem) => {
            let taxationSystemList = taxationSystem.taxationSystemDTOList;
            return dispatch({
                type: DICTIONARY_TYPES.GET_TAXATION_SYSTEM_LIST,
                taxationSystemList
            })
        })
}

export function getLegalFormList() {
    return (dispatch) => getRequest('/company/rest/internal/dictionary/legal-form/all')
        .then((legalForm) => {
            let legalFormList = legalForm.legalFormDTOList;
            return dispatch({
                type: DICTIONARY_TYPES.GET_LEGAL_FORM_LIST,
                legalFormList
            })
        })
}
