import React from 'react';
import * as ReactDOM from "react-dom";
import './ModalWindow.css';

const ModalWindow = ({ visible, hide, content }) => visible ?
  ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal_wrapper">
          <div className="modal">
            <div className="modal_header">
              <button type="button" className="modal_btn-close" onClick={hide}>&times;</button>
            </div>
            <div className="modal_body">
              {content}
            </div>
          </div>
        </div>
    </React.Fragment>,
    document.body
  ) : null;

export default ModalWindow;
