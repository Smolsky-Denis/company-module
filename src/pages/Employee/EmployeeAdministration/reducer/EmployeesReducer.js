import {USER_PROFILE_TYPES} from "../../../../actions/UserProfileAction";

const InitialState = {
    userProfileListAll: []
};

function employeesInfoReducer(state = InitialState, action) {
    switch (action.type) {
        case USER_PROFILE_TYPES.GET_ALL_PROFILE_LIST:
            return {
                ...state,
                userProfileListAll: action.userProfileList
            };
        default: return state;
    }
}

const EmployeesInfoReducer = {
    employeesData: employeesInfoReducer
};

export default EmployeesInfoReducer;
