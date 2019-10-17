import {successUpdate} from "../services/constants";
import {getRequest, postRequest} from "../services/utils";

export const USER_PROFILE_TYPES = {
    GET_USER_PROFILE_BY_ID: 'GET_USER_PROFILE_BY_ID',
    CREATE_USER_PROFILE: 'CREATE_USER_PROFILE',
    UPDATE_PROFILE_DATA: 'UPDATE_PROFILE_DATA',
    GET_ALL_PROFILE_LIST: 'GET_ALL_PROFILE_LIST',
    GET_OPERATIONS_BY_USER_PROFILE_ID: 'GET_OPERATIONS_BY_USER_PROFILE_ID',
    GET_ROLE_BY_USER_PROFILE_ID: 'GET_ROLE_BY_USER_PROFILE_ID',
    ADD_ROLE_LIST_BY_USER_PROFILE_ID: 'ADD_ROLE_LIST_BY_USER_PROFILE_ID'
};

export function getUserProfileById(userId) {
    return (dispatch) =>getRequest('/company/rest/internal/user-profile/' + userId)
        .then((profileData) =>
        dispatch({
            type: USER_PROFILE_TYPES.GET_USER_PROFILE_BY_ID,
            profileData
        }))
}

export function getAllProfileList(request) {
    return (dispatch) => postRequest('/company/rest/internal/user-profile/all', request)
        .then((allProfileList) => {
        let userProfileList = allProfileList.content;
        dispatch({
            type: USER_PROFILE_TYPES.GET_ALL_PROFILE_LIST,
            userProfileList
        })
    })
}

export function createUserProfile(defaultUserProfileData, redirectToEdit) {
    return (dispatch) => postRequest('/company/rest/internal/user-profile/create', redirectToEdit)
        .then((profileDataInfo) => {
        redirectToEdit(profileDataInfo.id);
        return dispatch({
            type: USER_PROFILE_TYPES.CREATE_USER_PROFILE,
            profileDataInfo
        })
    })
}

export function updateProfile(profileRequest) {
    return (dispatch) => postRequest('/company/rest/internal/user-profile/update', profileRequest)
        .then((profileData) => {
        alert(successUpdate);
        return dispatch({
            type: USER_PROFILE_TYPES.UPDATE_PROFILE_DATA,
            profileData
        })
    })
}

export function getOperationByUserProfileId(operationUserProfileId) {
    return (dispatch) => getRequest('/company/rest/internal/user-profile/' + operationUserProfileId + '/operation')
        .then((operationByProfileId) => {
            let operationByUserProfileIdData = operationByProfileId.operationList;
            dispatch({
                type: USER_PROFILE_TYPES.GET_OPERATIONS_BY_USER_PROFILE_ID,
                operationByUserProfileIdData
            })
        })
}

export function getRoleByUserProfileId(roleUserProfileId) {
    return (dispatch) => getRequest('/company/rest/internal/user-profile/' + roleUserProfileId + '/role')
        .then((roleByProfileId) => {
            let roleByUserProfileIdData = roleByProfileId.roles;
            dispatch({
                type: USER_PROFILE_TYPES.GET_ROLE_BY_USER_PROFILE_ID,
                roleByUserProfileIdData
            })
        })
}

export function addRoleListByUserProfileId(request) {
    return (dispatch) => postRequest('/company/rest/internal/user-profile/role/set', request)
        .then((roleListByUserProfileId) => {
            let roleByUserProfileIdData = roleListByUserProfileId.roleList;
            dispatch({
                type: USER_PROFILE_TYPES.ADD_ROLE_LIST_BY_USER_PROFILE_ID,
                roleByUserProfileIdData
            })
        })
}





