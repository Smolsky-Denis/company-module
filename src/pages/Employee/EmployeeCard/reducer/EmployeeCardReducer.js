import {CASH_BOX_CARD_TYPES} from "../../../../actions/CashBoxAction";
import {USER_PROFILE_TYPES} from "../../../../actions/UserProfileAction";
import {APPLICATION_MODULE_TYPES} from "../../../../actions/ApplicationModuleAction";
import {ROLE_TYPES} from "../../../../actions/RoleAction";
import {NODE_TYPES} from "../../../../actions/NodeAction";
import {CARDS_TYPES} from "../../../../actions/CardsAction";
import {COMPANY_TYPES} from "../../../../actions/CompanyAction";


const InitialState = {
    employeeLoginInfo: {},
    moduleRolesData: [],
    cashBoxList: [],
    nodeList: [],
    profileData: {},
    profileDataInfo: {},
    userRole: {},
    companyBiIdData: {},
    roleListByUserProfileId: [],
    roleListByCompanyData: null,
    roleByUserProfileIdData: null,
    searchValueData: ''
};

function employeeCardInfoReducer(state = InitialState, action) {
    switch (action.type) {
        case APPLICATION_MODULE_TYPES.GET_ROLES_BY_ID_MODULE:
            return {
                ...state,
                moduleRolesData: action.moduleRolesData
            };
        case CASH_BOX_CARD_TYPES.SET_CASH_BOXES:
            return {
                ...state,
                cashBoxList: action.cashBoxList
            };
        case NODE_TYPES.GET_ALL_NODES:
            return {
                ...state,
                nodeList: action.nodeList
            };
        case USER_PROFILE_TYPES.GET_USER_PROFILE_BY_ID:
        case USER_PROFILE_TYPES.UPDATE_PROFILE_DATA:
            return {
                ...state,
                profileData: action.profileData
            };
        case ROLE_TYPES.CREATE_ROLE:
            return {
                ...state,
                roleData: action.roleData
            };

        case USER_PROFILE_TYPES.CREATE_USER_PROFILE:
            return {
                ...state,
                profileDataInfo: action.profileDataInfo
            };
        case CARDS_TYPES.CLEAR_EMPLOYEE:
            return {
                ...state,
                employeeLoginInfo: InitialState.employeeLoginInfo,
                moduleRolesData: InitialState.moduleRolesData,
                cashBoxList: InitialState.cashBoxList,
                nodeList: InitialState.nodeList,
                profileData: InitialState.profileData,
                profileDataInfo: InitialState.profileDataInfo,
                userRole: InitialState.userRole,
                companyBiIdData: InitialState.companyBiIdData,
                roleListByUserProfileId: InitialState.roleListByUserProfileId,
                roleListByCompanyData: InitialState.roleListByCompanyData,
                roleByUserProfileIdData: InitialState.roleByUserProfileIdData
            };

        case COMPANY_TYPES.GET_COMPANY_BY_ID:
            return {
                ...state,
                companyBiIdData: action.companyBiIdData
            };
        case COMPANY_TYPES.ADD_ROLE_LIST_BY_USER_PROFILE_ID:
            return {
                ...state,
                roleListByUserProfileId: action.roleListByUserProfileId
            };
        case ROLE_TYPES.GET_ROLE_LIST_BY_COMPANY:
            return{
                ...state,
                roleListByCompanyData: action.roleListByCompanyData
            };
        case USER_PROFILE_TYPES.GET_ROLE_BY_USER_PROFILE_ID:
            return{
                ...state,
                roleByUserProfileIdData: action.roleByUserProfileIdData
            };
        case CARDS_TYPES.GET_SEARCH_VALUE:
            return{
                ...state,
                searchValueData: action.searchValueData
            };
        default:
            return state;
    }
}

const EmployeeCardInfoReducer = {
    employeeCard: employeeCardInfoReducer
};

export default EmployeeCardInfoReducer;
