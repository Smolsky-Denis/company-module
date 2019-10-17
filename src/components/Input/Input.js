import React from 'react';
import './Input.module.css';

const Input = (props) => {
    let {data, className, values} = props;
    return (
        <div className={`form-group ${data.className || className || 'col-lg-4'}`}>
            <label className={data.labelClass}>
                {data.labelTopName}
                <input disabled={data.disabled && data.disabled()}
                       name={data.name} className="form-control"
                       defaultValue={values && values[data.name] || null}
                       type={data.type} maxLength={data.maxlength}
                       placeholder={data.placeholder}/>
                {data.labelName}
            </label>
        </div>
    )
};

export default Input;
