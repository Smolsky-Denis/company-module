import React from 'react';
import {connect} from "react-redux";
import NavLink from "react-router-dom/es/NavLink";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {getCompanyById} from "../../actions/CompanyAction";



class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.props.getCompanyById(1);
    }


    render() {
        let {inn, fullName, directorFullName} = this.props.companyBiIdData;
        return (
            <nav className="navbar navbar-light bg-color">
                <NavLink to="/" className="navbar-brand mb-0 h1">Full name project</NavLink>
                <span title="companyName">Организация: {fullName || 'fullName'}</span>
                <span title="inn">ИНН: {inn || 'inn'}</span>
                <span title="userName">Пользователь: {directorFullName || 'directorFullName'}</span>
                <a href='#' className='btn btnColor'>ВЫХОД</a>
            </nav>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyById:(companyId) => dispatch(getCompanyById(companyId))
    }
};
const mapStateToProps = (state) => {
    return {
        companyBiIdData: state.ocrCm.companyBiIdData
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
