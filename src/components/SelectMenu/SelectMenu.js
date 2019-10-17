import React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../app/scss/main.scss'

const SelectMenu = (props) => {
    let optionListName = props.data.optionListName,
        defaultValue = props.data.defaultValueName && props.values && props.values[props.data.defaultValueName],
        showSelect,
        options;
    if(!props.data.defaultValueNameIsId && defaultValue){
        defaultValue =  props.values[props.data.defaultValueName].id
    }
    showSelect = !props.data.defaultValueName || defaultValue || props.responseData.isAddPage;
    options = props.responseData && optionListName && props.responseData[optionListName] &&
    props.responseData[optionListName].length
        ?
        props.responseData[optionListName].map(item => <option value={item.id} key={item.id}>{item.name}</option>)
        :
        <option value="0">--- Пусто ---</option>;
    if(props.data.add){
        let optionZero =[<option value='' key={-1}>{props.data.firstValue}</option>] ;
        options = optionZero.concat(options);
    }
    return (
        <div className={`form-group ${props.data.className || 'col-lg-4'}`}>
            <label className="selectForm">
                {showSelect ? <select required name={props.data.name} className="custom-select"
                                      defaultValue={defaultValue || null}
                                      onChange={(e) => {
                                          if (props.data && props.data.add && props.data.handleChange) {
                                              return props.data.handleChange(e.target.value);
                                          }
                                      }}>
                    {options}
                </select> : null}
                {props.data.labelName}
            </label>
        </div>
    )
};


export default SelectMenu;
