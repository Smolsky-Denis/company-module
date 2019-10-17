import {getRequest, postRequest} from "../services/utils";
import {successUpdate} from "../services/constants";

export const COMPANY_TYPES = {
    GET_COMPANY_BY_ID: 'GET_COMPANY_BY_ID',
    GET_COMPANY_LIST: 'GET_COMPANY_LIST',
    CREATE_COMPANY: 'CREATE_COMPANY',
    GET_OWNER_APP_MODULE: 'GET_OWNER_APP_MODULE',
    UPDATE_COMPANY: 'UPDATE_COMPANY'
};


export function getCompanyById(companyId) {
    return (dispatch) => getRequest('/company/rest/internal/company/' + companyId)
        .then((companyBiIdData) => dispatch({
                type: COMPANY_TYPES.GET_COMPANY_BY_ID,
                companyBiIdData
            })
        )
}

export function getCompanyList(companyListRequestData) {
    return (dispatch) => postRequest('/company/rest/internal/company/all', companyListRequestData)
        .then(companyLostData => dispatch({
            type: COMPANY_TYPES.GET_COMPANY_LIST,
            companyLostData
        }));
}

export function createCompany(companyCreateRequestData) {
    return (dispatch) => postRequest('/company/rest/internal/company/create', companyCreateRequestData)
        .then(companyData => dispatch({
            type: COMPANY_TYPES.CREATE_COMPANY,
            companyData
        }));
}

export function getOwnerAppModule(moduleNum) {
    return (dispatch) => postRequest('/company/rest/internal/company/module/set', moduleNum)
        .then(appModuleData => dispatch({
            type: COMPANY_TYPES.GET_OWNER_APP_MODULE,
            appModuleData
        }));
}

export function updateCompany(updateCompanyRequestData) {
    return (dispatch) => postRequest('/company/rest/internal/company/update', updateCompanyRequestData)
        .then(companyData => {
            alert(successUpdate);
            return dispatch({
                type: COMPANY_TYPES.UPDATE_COMPANY,
                companyData
            })
        });
}
