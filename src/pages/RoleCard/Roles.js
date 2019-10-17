import React from 'react';
import {connect} from "react-redux";
import SearchForTable from "../../components/SearchForTable/SearchForTable";
import Table from "../../components/Table/Table";
import {NavLink} from "react-router-dom";
import {pagination} from "../../services/utils";
import {getRoleListByCompany} from "../../actions/RoleAction";


const mapRoleList = (roleList) => {
    let result = [];
    if (roleList && roleList.length) {
        result = roleList.map((role) => {
            return {
                ...role
            }
        })
    }
    return result;
};

class Roles extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                dataField: "id",
                isKey: true,
                hidden: true
            },
            {
                dataField: "applicationModule",
                label: "Модуль",
                dataFormatter: function (cell, row) {
                    return cell && cell.name;
                },
                dataSort: true
            },
            {
                dataField: "name",
                label: "Наименование",
                dataSort: true
            },
            {
                dataField: "owner",
                label: "Владелец",
                dataFormatter: function (cell, row) {
                    return cell && cell.name;
                },
                dataSort: true
            }
        ];
        this.props.getRoleListByCompany();
    }

    render() {
        let {roleListByCompanyData, path} = this.props;
        return (
            <div className='col-lg-9 col-md-8'>
                <div className='form-row searchForTable'>
                    <div className='col-lg-2'>
                        <NavLink to={path + '/add'} className='btn btn-outline-secondary btnColor'>Добавить</NavLink>
                    </div>
                    <SearchForTable/>
                </div>
                {roleListByCompanyData && roleListByCompanyData.length ?
                    <Table url={'/roles/edit/'} data={mapRoleList(roleListByCompanyData)}
                           columns={this.columns}/> : null}
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getRoleListByCompany: (RoleListRequest) => dispatch(getRoleListByCompany(RoleListRequest))
    }
};
const mapStateToProps = (state) => {
    return {
        roleListByCompanyData: state.roleCard.roleListByCompanyData
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Roles);
