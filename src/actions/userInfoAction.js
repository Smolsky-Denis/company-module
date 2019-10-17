import {getRequest} from "../services/utils";

export const USER_INFO = {
  GET_USER_BY_ID: 'GET_USER_BY_ID',
};



function getUserByIdAction(user, owner) {
  return {
    type: USER_INFO.GET_USER_BY_ID,
    user,
    owner
  }
}

export function getUserByIdDispatch(userId) {
  return dispatch => {
    return getRequest('/user/rest/internal/user/' + userId)
      .then(result => result.json())
      .then(data => {
        let user = data;
        getRequest('/user/rest/internal/owner/' + user.ownerId)
          .then(result => result.json())
          .then(data => {
            let owner = data;
            dispatch(getUserByIdAction(user, owner));
          });
      })
  }
}
