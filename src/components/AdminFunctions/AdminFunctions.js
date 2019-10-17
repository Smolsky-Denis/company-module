import React from 'react';
import { NavLink} from "react-router-dom";
import './AdminFunctions.module.css';


const AdminFunctions = (props) => {
    let {path, id, imgUrl, alt, value} = props.data;
    return (
            <NavLink to={path} id={id} className='NavLink sidebar-panel' activeClassName={"sidebar-panel_active"}>
                <div className='border sidebar-panel_item'>
                    <img src={imgUrl} alt={alt}/>
                    {value}
                </div>
            </NavLink>
    )
};

export default AdminFunctions;
