import {NODE_TYPES} from "../../actions/NodeAction";
import {USER_PROFILE_TYPES} from "../../actions/UserProfileAction";


const InitialState = {
    nodeByIdData: {},
    nodeList: [],
    userProfileList: [],
    updateNodeData: {}
};

function markingCardInfoReducer(state = InitialState, action) {
    switch (action.type) {
        case NODE_TYPES.GET_NODE_BY_ID:
            return {
                ...state,
                nodeByIdData: action.nodeByIdData
            };
        case NODE_TYPES.GET_ALL_NODES:
            return {
                ...state,
                nodeList: action.nodeList
            };
        case USER_PROFILE_TYPES.GET_ALL_PROFILE_LIST:
            return {
                ...state,
                userProfileList: action.userProfileList
            };
        case NODE_TYPES.UPDATE_NODE:
            return {
                ...state,
                updateNodeData: action.updateNodeData
            };
        case USER_PROFILE_TYPES.GET_USER_PROFILE_BY_ID:
            return {
                ...state,
                profileData: action.profileData
            };
        case NODE_TYPES.CLEAR_NODE:
            return {
                ...state,
                nodeList: InitialState.nodeList,
                updateNodeData: InitialState.updateNodeData,
                nodeByIdData: InitialState.nodeByIdData
            };
        default:
            return state;
    }
}


const MarkingCardInfoReducer = {
    markingCard: markingCardInfoReducer
};

export default MarkingCardInfoReducer;
