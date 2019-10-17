import {operationsByIdModule, rolesByIdModule} from "../controllers/application-module-controller";

export const APPLICATION_MODULE_TYPES = {
    GET_ROLES_BY_ID_MODULE: 'GET_ROLES_BY_ID_MODULE',
    GET_OPERATIONS_BY_ID_MODULE: 'GET_OPERATIONS_BY_ID_MODULE'
};

export function getRolesByIdModule(moduleId) {
    let moduleRolesData = {
        "roleList": [
            {
                "applicationModuleId": 0,
                "id": 0,
                "name": "string",
                "operationList": [
                    0
                ],
                "ownerId": 0
            }
        ]
    };
    return (dispatch) => ({
            type: APPLICATION_MODULE_TYPES.GET_ROLES_BY_ID_MODULE,
            moduleRolesData
        })
}

export function getOperationsByIdModule(moduleId) {
    return (dispatch) => {
        operationsByIdModule(moduleId).then((operationList) => dispatch({
            type: APPLICATION_MODULE_TYPES.GET_OPERATIONS_BY_ID_MODULE,
            operationList
        }))
    }
}
