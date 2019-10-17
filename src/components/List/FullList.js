import React from 'react';
import ListItem from "./ListItem";
import './FullList.module.css'

const FullList = (props) => {
    let transferElements = (event) => {

        let input = event.target.parentElement.querySelector('input'),
            id = input.value,
            selectedItem = {};

        if (!event.target.value) {
            event.preventDefault();
            input.checked = true;
        }

        let responseData = props.responseData.filter(item => {
            if (item.id == id) {
                selectedItem = item;
            }
            return item.id != id
        });

        setTimeout((responseData, selectedItem) => {
            props.updateResponseData(responseData, selectedItem);
        }, 200, responseData, selectedItem)
    };
    let {data, responseData} = props;
    return (
        <div className={data.className}>
            {responseData && responseData.length ?
                    <ul onClick={(event) => transferElements(event)}
                        className='list-group listGroup list-border-color rounded'>
                        {responseData.map(dataItem => <ListItem key={dataItem.id} item={dataItem}/>)}
                    </ul> : null}
        </div>
    )

};
export default FullList;
