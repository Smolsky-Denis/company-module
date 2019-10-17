import {getRequest, postRequest} from "../services/utils";

export function rolesByIdModule(request) {
    let promise = new Promise((resolve, reject) => {
        getRequest('/user/rest/internal/module/' + request + '/role')
            .then(result => result.json())
            .then(moduleRoles => {
                let moduleRolesData = moduleRoles.roleList;
                resolve(moduleRolesData)
            })
    });
    return promise;
}

export function operationsByIdModule(request) {
    let promise = new Promise((resolve, reject) => {
        getRequest('/user/rest/internal/module/'+ request +'/operation')
            .then(result => result.json())
            .then(moduleOperationList => {
                let operationList = moduleOperationList.operationList;
                resolve(operationList)
            })
    });
    return promise;
}
