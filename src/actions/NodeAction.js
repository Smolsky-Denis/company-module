import {successUpdate} from "../services/constants";
import {getRequest, postRequest} from "../services/utils";

export const NODE_TYPES = {
    CREATE_NODE: 'CREATE_NODE',
    GET_ALL_NODES: 'GET_ALL_NODES',
    GET_NODE_BY_ID: 'GET_NODE_BY_ID',
    UPDATE_NODE: 'UPDATE_NODE',
    CLEAR_NODE: 'CLEAR_NODE'

};

export function clearNodeCard() {
    return (dispatch) => dispatch({
        type: NODE_TYPES.CLEAR_NODE
    })
}

export function createNode(createNodeData, redirectToEdit) {
    return (dispatch) => {
        postRequest('/company/rest/internal/node/create', createNodeData)
            .then((nodeData) => {
            redirectToEdit(nodeData.id);
            dispatch({
                type: NODE_TYPES.CREATE_NODE,
                nodeData
            })
        })
    }
}

//Получение всех узлов
export function getNodesList(NodeListRequest) {
    return (dispatch) => {
        postRequest('/company/rest/internal/node/all', NodeListRequest)
            .then((allNodes) => {
            let nodeList = allNodes.content;
            dispatch({
                type: NODE_TYPES.GET_ALL_NODES,
                nodeList
            })
        })
    }
}

//Получение узла по id
export function nodeById(nodeId) {
    return (dispatch) => {
        getRequest('/company/rest/internal/node/' + nodeId)
            .then((response) => {
                let nodeByIdData = {
                    ...response,
                    nodeTypeName: response.nodeType.name
                };
                return dispatch({
                    type: NODE_TYPES.GET_NODE_BY_ID,
                    nodeByIdData
                })
            })
    }
}

//Изменение данных узла
export function updateNode(updateNodeRequest) {
    return (dispatch) => {
        postRequest('/company/rest/internal/node/update', updateNodeRequest)
            .then((updateNodeData) => {
            alert(successUpdate);
            return dispatch({
                type: NODE_TYPES.UPDATE_NODE,
                updateNodeData
            })
        })
    }
}

