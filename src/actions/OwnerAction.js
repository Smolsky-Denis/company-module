import {createNewOwner, getAllOwnerData, getOwnerByIDData} from "../controllers/owner-controller";

export const OWNER_TYPES = {
    GET_OWNER_BY_ID: 'GET_OWNER_BY_ID',
    GET_ALL_OWNER: 'GET_ALL_OWNER',
    CREATE_OWNER: 'CREATE_OWNER'
};
export function getOwnerById(ownerId) {
    return (dispatch) => getOwnerByIDData(ownerId).then((ownerByIdData) => dispatch({
        type: OWNER_TYPES.GET_OWNER_BY_ID,
        ownerByIdData
    }))
}

export function getAllOwnerList() {
    return (dispatch) => getAllOwnerData().then((AllOwnerData) => dispatch({
        type: OWNER_TYPES.GET_ALL_OWNER,
        AllOwnerData
    }))
}

export function createOwner(createOwnerData) {
    return (dispatch) => createNewOwner(createOwnerData).then((OwnerData) => dispatch({
        type: OWNER_TYPES.CREATE_OWNER,
        OwnerData
    }))
}
