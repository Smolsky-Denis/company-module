import React from 'react';
import {connect} from "react-redux";
import Table from "../../../components/Table/Table";
import SearchForTable from "../../../components/SearchForTable/SearchForTable";
import {NavLink} from "react-router-dom";
import {pagination} from "../../../services/utils";
import {getAllProfileList} from "../../../actions/UserProfileAction";
import {getSearchValue} from "../../../actions/CardsAction";


const mapUserList = (userProfileList) => {
    let result = [];
    if (userProfileList && userProfileList.length) {
        result = userProfileList.map((user) => {
            user.active = user.active ? 'Активный' : 'Неактивный';
            return {
                ...user,
                fullName: user.lastName + ' ' + user.firstName + ' ' + user.secondName
            }
        })
    }
    return result;
};

class EmployeeAdministration extends React.Component {
    constructor(props) {
        super(props);
        this.props.getAllProfileList(JSON.stringify(pagination));
        this.listChange.bind(this);
    }

    listChange(searchValueData) {
        let searchRequest = {
            ...pagination,
            "lastName": {
                "sortEnum": "NONE",
                "value": searchValueData
            }
        };
        this.props.getAllProfileList(JSON.stringify(searchRequest));
    }

    render() {
        let userProfileList = this.props.userProfileList;
        if (userProfileList && userProfileList.length) {
            userProfileList = mapUserList(userProfileList);
        }
        let columns = [
            {
                isKey: true,
                dataField: 'id',
                label: 'Id',
                hidden: true
            },
            {
                dataField: 'active',
                label: 'Статус',
                dataSort: true
            },
            {
                dataField: 'login',
                label: 'Логин',
                dataSort: true
            },
            {
                dataField: "email",
                label: "Email",
                dataSort: true
            }, {
                dataField: "fullName",
                label: "Сотрудник (ФИО)",
                dataSort: true
            }, {
                dataField: "comment",
                label: "Примечание",
                dataSort: true
            },
        ];
        return (
            <div className='col-lg-9 col-md-8'>
                <div className='form-row searchForTable'>
                    <div className='col-lg-2'>
                        <NavLink to={this.props.path + '/add'}
                                 className='btn btn-outline-secondary btnColor'>Добавить</NavLink>
                    </div>
                    <SearchForTable listChange={(searchValueData)=>this.listChange(searchValueData)}/>
                    {/*todo КРИВОХАК*/}
                </div>
                {userProfileList && userProfileList.length ?
                    <Table url={'/employee-administration/edit/'} data={userProfileList}
                           columns={columns}/> : null}
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getAllProfileList: (request) => dispatch(getAllProfileList(request)),
        getSearchValue: (searchValue) => dispatch(getSearchValue(searchValue))
    }
};
const mapStateToProps = (state) => {
    return {
        userProfileList: state.employeesData.userProfileListAll,
        searchValueData: state.employeeCard.searchValueData
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeAdministration);
