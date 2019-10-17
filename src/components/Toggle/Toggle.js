import React from "react";
import './Toggle.module.css'

const Toggle = (props) => {
    let {data, values, uniqueKey, responseData, marginRight, marginLeft} = props,
        defaultValue = data && values && data.defaultValueName && values[data.defaultValueName],
        showToggle = !data.defaultValueName || defaultValue || responseData.isAddPage,
        value = defaultValue && data.useObject && data.useObject.value && data.useObject.values ?
            (defaultValue[data.useObject.value] === data.useObject.values[1]) : !!defaultValue;
    return (showToggle ? (<div className={data.className} id={uniqueKey}>
        <span className='marginToggle'>{data.leftValue}</span>
        <label className="switch">
            <input name={data.name} type="checkbox" defaultChecked={value}/>
            <div className="slider"/>
            <br/>{data.labelName}
        </label>
        <span className='marginToggle'>{data.rightValue}</span>
    </div>) : null)
};

export default Toggle;
