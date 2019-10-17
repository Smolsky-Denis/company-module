import React from 'react';
import { connect } from 'react-redux';
import {toggleModalWindow} from "../../actions/ModalWindowAction";


class ButtonForCallModal extends React.Component{
    constructor(props) {
        super(props);
        // this.props.toggleModalWindow(value, data);
    }
    render() {
        let data = this.props.data;
        return(
            <div className='col-lg-3'>
                <button onClick={() => this.props.toggleModalWindow(!this.props.modalWindowSettings.isOpen, data)} type='button' className='btn btn-outline-secondary btnColor'>Добавить кассу</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modalWindowSettings: state.modalWindowSettings
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleModalWindow: (value, data) => {
            dispatch(toggleModalWindow(value, data))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonForCallModal);
