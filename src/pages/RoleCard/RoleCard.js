import React from 'react';
import {connect} from "react-redux";
import {
    createRequestBody,
    getFullListComponentList,
    MapDataToFormElementsService, pagination
} from "../../services/utils";
import {
    clearRoleCard,
    createUserProfileRole,
    getOperationListForCreateRole,
    getRoleById, getRoleListByCompany,
    updateRole
} from "../../actions/RoleAction";
import {getAllProfileList, getUserProfileById} from "../../actions/UserProfileAction";

class RoleCard extends React.Component {
    constructor(props) {
        super(props);
        this.fullListComponentName = "operations";
        this.initialize();
        this.roleCardFields = [
            {
                id: 0,
                name: 'cardName',
                element: 'headline',
                className: 'col-lg-2 marginBottom1em',
                headline: 'Карточка Роли'
            }, {
                id: 1,
                name: 'roleId',
                responseDataName: 'roleDataById',
                defaultValueName: 'id',
                defaultValueNameIsId: true,
                optionListName: 'roleListByCompanyData',
                handleChange: (value) => {
                    setTimeout(() => this.redirectToPage(value))
                },
                element: 'select',
                add: true,
                firstValue: 'Создается новая роль',
                editPath: '/roles/edit/',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Выбрите Роль для редактирования',
                hideOnEditPage: true
            }, {
                id: 2,
                name: 'name',
                responseDataName: 'roleDataById',
                element: 'input',
                type: 'text',
                className: 'col-lg-12',
                placeholder: 'Название',
                labelName: 'Название'

            },
            // {
            //     id: 3,
            //     element: 'toggle',
            //     className: 'col-lg-6',
            //     name: '',
            //     labelName: 'Касса',
            //     responseDataName: '',
            //     defaultValueName: '',
            //     useObject: {
            //         value: "id",
            //         values: [2, 1]
            //     }
            // },
            // {
            //     id: 4,
            //     element: 'toggle',
            //     className: 'col-lg-6',
            //     name: '',
            //     labelName: 'Маркировка',
            //     responseDataName: '',
            //     defaultValueName: '',
            //     useObject: {
            //         value: "id",
            //         values: [2, 1]
            //     }
            // },
            {
                id: 5,
                element: 'fullListComponent',
                responseDataName: 'roleDataById',
                type: 'search',
                name: 'operations',
                fullListFieldName: 'operationListData',
                selectedListFieldName: 'selectedOperationList',
                className: "col-lg-12 row",
                classNameInside: "col-lg-6",
                placeholder: 'Фильтр',
                headline: 'Выбраны',
                labelTopName: 'Доступные операции',
            },
            {
                id: 6,
                element: 'fullListComponent',
                responseDataName:'roleDataById',
                type: 'search',
                name: 'userProfileList',
                fullListFieldName: 'userProfileList',
                selectedListFieldName: 'selectedUserList',
                className: "col-lg-12 row",
                classNameInside: "col-lg-6",
                placeholder: 'Фильтр',
                headline: 'Выбраны',
                showOnEditPage: true,
                labelTopName:'Сотрудники, которым назначена Роль:',
            },
            {
                id: 7,
                element: 'textarea',
                name: 'comment',
                className: 'col-lg-12 marginBottom2em',
                placeholder: 'Примечание'
            },
            {
                id: 8,
                element: 'button',
                name: 'Удалить роль',
                className: 'btn btnColor col-lg-3 offset-2',
                type: 'button',
                onClick: function () {
                }
            }, {
                id: 9,
                element: 'button',
                name: 'Назад без сохранения',
                className: 'btn btnColor col-lg-3',
                type: 'button',
                onClick: () => this.props.history.replace('/administration-of-cash-registers')
            }, {
                id: 10,
                element: 'button',
                name: 'Сохранить',
                className: 'btn btnColor col-lg-3',
                type: 'button',
                onClick: this.handleSubmit.bind(this)
            },
        ];
    }

    initialize() {
        this.props.clearRoleCard();
        this.props.getOperationListForCreateRole();
        this.props.getRoleListByCompany();

        if (this.isEditPage()) {
            let id = this.getUrlParam();
            this.props.getAllProfileList(JSON.stringify(pagination));
        //     if (!this.props.roleListByCompanyData || !this.props.roleListByCompanyData.length) {
        //         this.props.getRoleListByCompany();
        //     } else { let id = this.getUrlParam();
                this.props.getRoleById(id, this.props.roleListByCompanyData)
        //     }
        }
    }

    componentWillUnmount() {
        this.props.clearRoleCard();
    }

    handleSubmit() {
        let requestBody = createRequestBody(this.roleCardFields, "roleDataById_operations", this.isEditPage());
        delete requestBody.comment;
        delete requestBody.roleId;
        let requestBodyWithId = {
            ...requestBody,
            id: this.props.roleDataById.id
        };
        this.isEditPage() ? this.props.updateRole(JSON.stringify(requestBodyWithId))
            : this.props.createUserProfileRole(JSON.stringify(requestBody), this.redirectToPage);
    }

    getUrlParam = () => this.props.match && this.props.match.params && this.props.match.params.id && +this.props.match.params.id;
    isEditPage = () => this.getUrlParam() && this.props.type === 'edit';
    redirectToPage = (id) => {
        this.props.history.push('/roles' + (id ? ('/edit/' + id) : "/add"));
        this.initialize();
    };

    render() {
        let {operationListData, roleDataById, roleListByCompanyData, userProfileList} = this.props,
            isAddPage = !this.isEditPage(),
            // operationListDataIds = [],
            operationListDataIds = !isAddPage ? (roleDataById && roleDataById.operations ? (roleDataById.operations.length ?
                roleDataById.operations.map(operation => operation.id) : []) : null) : [],
            operations,
            selectedOperationList;
        if (operationListDataIds && operationListData) {
            operations = {operations: operationListDataIds};
            selectedOperationList = !isAddPage ? getFullListComponentList(operationListData, operations, this.fullListComponentName) : [];
        }
        let responseData = {
            roleListByCompanyData,
            selectedOperationList,
            isAddPage,
            roleDataById,
            operationListData,
            userProfileList
        };
        let result = MapDataToFormElementsService.getElementFormService(this.roleCardFields, responseData);

        return (
            <div className='col-lg-9 col-md-8'>
                <div className="form-row">
                    {result}
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfileById: (id) => dispatch(getUserProfileById(id)),
        getAllProfileList: (request) => dispatch(getAllProfileList(request)),
        updateRole: (request) => dispatch(updateRole(request)),
        clearRoleCard: () => dispatch(clearRoleCard()),
        getOperationListForCreateRole: () => dispatch(getOperationListForCreateRole()),
        getRoleById: (id, roleList) => dispatch(getRoleById(id, roleList)),
        getRoleListByCompany: () => dispatch(getRoleListByCompany()),
        createUserProfileRole: (request, redirectToEdit) => dispatch(createUserProfileRole(request, redirectToEdit))
    }
};
const mapStateToProps = (state) => {
    return {
        profileData: state.roleCard.profileData,
        operationListData: state.roleCard.operationListData,
        roleDataById: state.roleCard.roleDataById,
        roleListByCompanyData: state.roleCard.roleListByCompanyData,
        userProfileList: state.roleCard.userProfileList,
        userProfileRoleData: state.roleCard.userProfileRoleData,
        updateUserRole: state.roleCard.updateUserRole
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleCard);
