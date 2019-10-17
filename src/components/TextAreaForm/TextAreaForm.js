import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const TextAreaForm = (props) => {
    let {data, responseData, values} = props,
        defaultValue = data.defaultValueName && values && values[data.defaultValueName],
        showDescription = !data.defaultValueName || defaultValue || responseData.isAddPage;
    return (
        !!showDescription ? (<div className={data.className}>
            <textarea defaultValue={defaultValue} name={data.name} className="form-control" rows="3"
                      placeholder={data.placeholder}/>
        </div>) : null
    )
};

export default TextAreaForm;
