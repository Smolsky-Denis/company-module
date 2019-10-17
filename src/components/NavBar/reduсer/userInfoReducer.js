import {USER_INFO} from "../../../actions/userInfoAction";

const InitialState = {
    user: {},
    owner: {}
};

function userInfoReducer(state = InitialState, action) {
    switch (action.type) {
        case USER_INFO.GET_USER_BY_ID:
            return {
                ...state,
                user: action.user,
                owner: action.owner
            };
        default:
            return state;
    }
}

const UserInfoReducer = {
    userData: userInfoReducer
};

export default UserInfoReducer;
