import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

  };

  componentWillMount() {
    this.root = document.createElement('div');
    document.body.appendChild(this.root);

  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }


  render() {
    // todo перенести то, что под button, в компонент
    return ReactDOM.createPortal(
      <div className="modal">
        <button className="modal__close-button  btn btn-outline-secondary" onClick={() => this.props.toggleWindow(false)}>Закрыть</button>
      </div>,
      this.root
    );
  }
}
