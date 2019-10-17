import React from 'react';
import {connect} from 'react-redux';
import './InputPlusButton.module.css'
import ModalWindow from "../ModalWindow/ModalWindow";
import showModal from "../showModal/showModal";


const InputPlusButton = (props) => {
    const {visible, toggle} = showModal();
    let {name, labelName, buttonName, className, showContent, disabled} = props.data;
    let values = props.values;
    let submitModalWindow = (formData) => {
        //set value from formData with Hooks to input
        toggle();
    };
    return (
        <div className={`input-group mb-3 moveCenter ${className}`}>
            <label className="labelInputButton">
                <input name={name}  disabled={disabled} type="text" defaultValue={values && values[name] || null} className="form-control" aria-label="Recipient's username"
                       aria-describedby="basic-addon2"/>
                {labelName}
            </label>
            <div className="input-group-append inputButton">
                <button onClick={toggle} className="btn btnColor" type="button">{buttonName}</button>
            </div>
            <ModalWindow visible={visible} hide={toggle} content={showContent(submitModalWindow, toggle)}/>
        </div>
    )
};



export default InputPlusButton;
