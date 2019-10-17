import {getRequest, postRequest} from "../services/utils";

export function getOwnerByIDData(request) {
    let promise = new Promise((resolve, reject) => {
        getRequest('/user/rest/internal/owner/' + request)
            .then(result => result.json())
            .then(ownerByIdData => {
                resolve(ownerByIdData)
            })
    });
    return promise;
}

export function getAllOwnerData() {
    let promise = new Promise((resolve, reject) => {
        getRequest('/user/rest/internal/owner/all')
            .then(result => result.json())
            .then(AllOwnerData => {
                resolve(AllOwnerData)
            })
    });
    return promise;
}

export function createNewOwner(request) {
    let promise = new Promise((resolve, reject) => {
        postRequest('/rest/internal/owner/create', request)
            .then(result => result.json())
            .then(OwnerData => {
                resolve(OwnerData)
            })
    });
    return promise;
}
