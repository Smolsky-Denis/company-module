import {successUpdate} from "../services/constants";
import {getRequest, postRequest} from "../services/utils";


export const ROLE_TYPES = {
    CREATE_USER_PROFILE_ROLE: 'CREATE_USER_PROFILE_ROLE',
    UPDATE_ROLE: 'UPDATE_ROLE',
    GET_ROLE_LIST_BY_COMPANY: 'GET_ROLE_LIST_BY_COMPANY',
    GET_OPERATION_LIST_FOR_CREATE_ROLE: 'GET_OPERATION_LIST_FOR_CREATE_ROLE',
    CLEAR_ROLE: 'CLEAR_ROLE',
    GET_ROLE_BY_ID: 'GET_ROLE_BY_ID',
};


export function createUserProfileRole(setRole, redirectToEdit) {
    return (dispatch) => {
        postRequest('/company/rest/internal/user-role/create', setRole)
            .then((userProfileRoleData) => {
                // redirectToEdit(userProfileRoleData.id);
                dispatch({
                    type: ROLE_TYPES.CREATE_USER_PROFILE_ROLE,
                    userProfileRoleData
                })
            })
    }
}

export function updateRole(dataForUpdateRole) {
    return (dispatch) => {
        postRequest('/company/rest/internal/user-role/update', dataForUpdateRole)
            .then((updateUserRole) => {
                alert(successUpdate);
                return dispatch({
                    type: ROLE_TYPES.UPDATE_ROLE,
                    updateUserRole
                })
            })
    }
}

export function getRoleListByCompany() {
    return (dispatch) => {
        getRequest('/company/rest/internal/user-role/all')
            .then((roleListData) => {
                let roleListByCompanyData = roleListData.roles;
                dispatch({
                    type: ROLE_TYPES.GET_ROLE_LIST_BY_COMPANY,
                    roleListByCompanyData
                })
            })
    }
}

export function getOperationListForCreateRole() {
    return (dispatch) => {
        getRequest('/company/rest/internal/user-role/operation/all')
            .then((operationList) => {
                let operationListData = operationList.operations;
                dispatch({
                    type: ROLE_TYPES.GET_OPERATION_LIST_FOR_CREATE_ROLE,
                    operationListData
                })
            })
    }
}

export function clearRoleCard() {
    return (dispatch) => dispatch({
        type: ROLE_TYPES.CLEAR_ROLE
    })
}

export function getRoleById(roleId) {
    return (dispatch) => {
        getRequest('/company/rest/internal/user-role/' + roleId)
            .then((roleDataById) => {
                dispatch({
                    type: ROLE_TYPES.GET_ROLE_BY_ID,
                    roleDataById
                })
            })
    }
}
