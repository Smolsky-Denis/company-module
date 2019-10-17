export const MODAL_WINDOW_TYPES = {
  TOGGLE_MODAL_WINDOW: 'TOGGLE_MODAL_WINDOW',
  GET_MODAL_WINDOW_SETTINGS: 'GET_MODAL_WINDOW_SETTINGS'
};

export function toggleModalWindow(value, data) {
  return (dispatch) => {
    dispatch({
      type: 'TOGGLE_MODAL_WINDOW',
      isOpen: value,
      data: data
    });
  }
}

function getModalWindowSettings() {
  return (dispatch) => {
    dispatch({
      type: 'GET_MODAL_WINDOW_SETTINGS'
    });
  }
}
