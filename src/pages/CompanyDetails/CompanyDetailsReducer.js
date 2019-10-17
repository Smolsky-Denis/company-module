import {COMPANY_TYPES} from "../../actions/CompanyAction";
import {DICTIONARY_TYPES} from "../../actions/dictionaryAction";


const InitialState = {
    companyData: {},
    companyBiIdData: {},
    taxAuthorityList: [],
    taxationSystemList: [],
    legalFormList: []

};

function companyDetailsInfoReducer(state = InitialState, action) {
    switch (action.type) {
        case COMPANY_TYPES.UPDATE_COMPANY:
            return {
                ...state,
                companyData: action.companyData
            };
        case COMPANY_TYPES.GET_COMPANY_BY_ID:
            return {
                ...state,
                companyBiIdData: action.companyBiIdData
            };
        case DICTIONARY_TYPES.GET_TAX_AUTHORITY_LIST:
            return {
                ...state,
                taxAuthorityList: action.taxAuthorityList
            };
        case DICTIONARY_TYPES.GET_TAXATION_SYSTEM_LIST:
            return {
                ...state,
                taxationSystemList: action.taxationSystemList
            };
        case DICTIONARY_TYPES.GET_ZIPCODE_LIST:
            return {
                ...state,
                zipcodeList: action.zipcodeList
            };
        case DICTIONARY_TYPES.GET_LEGAL_FORM_LIST:
            return {
                ...state,
                legalFormList: action.legalFormList
            };
        default:
            return state;
    }
}

const CompanyDetailsInfoReducer = {
    companyDetails: companyDetailsInfoReducer
};

export default CompanyDetailsInfoReducer;
