import {ROLE_TYPES} from "../../../actions/RoleAction";
import {USER_PROFILE_TYPES} from "../../../actions/UserProfileAction";


const InitialState = {
    operationListData: null,
    operationByUserProfileIdData: [],
    userProfileList: [],
    roleListByCompanyData: [],
    roleDataById: {},
    updateUserRole: {},
    profileData: {}
};

function roleCardInfoReducer(state = InitialState, action) {
    switch (action.type) {
        case ROLE_TYPES.GET_OPERATION_LIST_FOR_CREATE_ROLE:
            return {
                ...state,
                operationListData: action.operationListData
            };
        case USER_PROFILE_TYPES.GET_OPERATIONS_BY_USER_PROFILE_ID:
            return {
                ...state,
                operationByUserProfileIdData: action.operationByUserProfileIdData
            };
        case USER_PROFILE_TYPES.GET_ALL_PROFILE_LIST:
            return {
                ...state,
                userProfileList: action.userProfileList
            };
        case ROLE_TYPES.CREATE_USER_PROFILE_ROLE:
            return {
                ...state,
                userProfileRoleData: action.userProfileRoleData
            };
        case ROLE_TYPES.CLEAR_ROLE:
            return {
                ...state,
                operationListData: InitialState.operationListData,
                operationByUserProfileIdData: InitialState.operationByUserProfileIdData,
                userProfileList: InitialState.userProfileList,
                roleDataById: InitialState.roleDataById
            };
        case ROLE_TYPES.GET_ROLE_LIST_BY_COMPANY:
            return {
                ...state,
                roleListByCompanyData: action.roleListByCompanyData
            };
        case ROLE_TYPES.GET_ROLE_BY_ID:
            return {
                ...state,
                roleDataById: action.roleDataById
            };
        case ROLE_TYPES.UPDATE_ROLE:
            return {
                ...state,
                updateUserRole: action.updateUserRole
            };
        case USER_PROFILE_TYPES.GET_USER_PROFILE_BY_ID:
            return {
                ...state,
                profileData: action.profileData
            };
        default:
            return state;
    }
}

const RoleCardInfoReducer = {
    roleCard: roleCardInfoReducer
};

export default RoleCardInfoReducer;
