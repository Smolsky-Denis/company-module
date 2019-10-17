import {COMPANY_TYPES} from "../../actions/CompanyAction";


const InitialState = {
    companyBiIdData: {}
};

function ocrCmInfoReducer(state = InitialState, action) {
    switch (action.type) {
        case COMPANY_TYPES.GET_COMPANY_BY_ID:
            return {
                ...state,
                companyBiIdData: action.companyBiIdData
            };
        default:
            return state;
    }
}
const OcrCmInfoReducer = {
    ocrCm: ocrCmInfoReducer
};

export default OcrCmInfoReducer;
