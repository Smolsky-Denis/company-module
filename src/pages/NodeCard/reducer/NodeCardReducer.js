import {NODE_TYPES} from "../../../actions/NodeAction";
import {DICTIONARY_TYPES} from "../../../actions/dictionaryAction";
import {CARDS_TYPES} from "../../../actions/CardsAction";

const InitialState = {
    nodeData: {},
    nodeList: [],
    zipcodeList: [],
    zipcode: {},
    updateNodeData: {},
    nodeByIdData: {},
    selectedValue: '',
    selectedZipCodeId: ''
};

function nodeCardInfoReducer(state = InitialState, action) {
    switch (action.type) {
        case NODE_TYPES.CREATE_NODE:
            return {
                ...state,
                nodeData: action.nodeData
            };
        case NODE_TYPES.GET_ALL_NODES:
            return {
                ...state,
                nodeList: action.nodeList
            };
        case DICTIONARY_TYPES.GET_ZIPCODE_LIST:
            return {
                ...state,
                zipcodeList: action.zipcodeList
            };
        case DICTIONARY_TYPES.GET_ZIPCODE_BY_ID:
            return {
                ...state,
                zipcode: action.zipcode
            };
        case NODE_TYPES.UPDATE_NODE:
            return {
                ...state,
                updateNodeData: action.updateNodeData
            };
        case NODE_TYPES.GET_NODE_BY_ID:
            return {
                ...state,
                nodeByIdData: action.nodeByIdData
            };
        case NODE_TYPES.CLEAR_NODE:
            return {
                ...state,
                nodeData: InitialState.nodeData,
                nodeList: InitialState.nodeList,
                zipcodeList: InitialState.zipcodeList,
                zipcode: InitialState.zipcode,
                updateNodeData: InitialState.updateNodeData,
                nodeByIdData: InitialState.nodeByIdData
            };
        case CARDS_TYPES.GET_SELECTED_VALUE:
            return {
                ...state,
                selectedFullZipCode: action.selectedFullZipCode,
                selectedZipCodeId: action.selectedZipCodeId
            };
        default:
            return state;
    }
}

const NodeCardInfoReducer = {
    nodeCard: nodeCardInfoReducer
};

export default NodeCardInfoReducer;
