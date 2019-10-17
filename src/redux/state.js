let store = {
  _state: {
    registrationInputAttribute: {

    }
  },
  _callSubscriber() {

  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {

  }
};

export default store;
