import React from 'react';


const ListItem = (props) => {
    return (
        <li className="list-group-item">
            <label><input type="checkbox" value={props.item.id}/>{props.item.name}</label>
        </li>
    )
};

export default ListItem;
