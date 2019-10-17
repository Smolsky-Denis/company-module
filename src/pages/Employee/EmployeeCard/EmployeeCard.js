import React from 'react';
import {connect} from "react-redux";
import './EmployeeCard.module.css';
import {
    createRequestBody,
    getFullListComponentList,
    MapDataToFormElementsService, pagination
} from "../../../services/utils";
import {
    updateProfile,
    createUserProfile,
    getUserProfileById, getRoleByUserProfileId, addRoleListByUserProfileId
} from "../../../actions/UserProfileAction";
import {clearEmployeeCard} from "../../../actions/CardsAction";
import {getCompanyById} from "../../../actions/CompanyAction";
import {getRoleListByCompany} from "../../../actions/RoleAction";

class EmployeeCard extends React.Component {
    constructor(props) {
        super(props);
        this.employeeCardFields = [
            {
                id: 0,
                name: 'cardName',
                element: 'headline',
                className: 'col-lg-8 marginBottom1em',
                headline: this.getUserCardName()
            }, {
                id: 1,
                name: 'active',
                element: 'toggle',
                className: 'col-lg-4',
                labelName: 'Активен',
                responseDataName: 'profileData',
                defaultValueName: 'active'
            },{
                id: 2,
                name: 'lastName',
                element: 'input',
                responseDataName: 'profileData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Фамилия'
            }, {
                id: 3,
                name: 'firstName',
                element: 'input',
                responseDataName: 'profileData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Имя'
            }, {
                id: 4,
                name: 'secondName',
                element: 'input',
                responseDataName: 'profileData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Отчество'
            }, {
                id: 5,
                name: 'login',
                element: 'input',
                responseDataName: 'profileData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Логин',
                hideOnEditPage: true,
                disabled: () => this.isEditPage()
            }, {
                id: 6,
                name: 'password',
                element: 'input',
                responseDataName: 'profileData',
                type: 'password',
                className: 'col-lg-4',
                labelName: 'Пароль',
                hideOnEditPage: true,
                disabled: () => this.isEditPage()
            }, {
                id: 7,
                name: 'phoneNumber',
                element: 'input',
                responseDataName: 'profileData',
                type: 'number',
                className: 'col-lg-2',
                labelName: 'Телефон'
            }, {
                id: 8,
                element: 'input',
                name: 'email',
                responseDataName: 'profileData',
                type: 'email',
                className: 'col-lg-2',
                labelName: 'E-mail'
            }, {
                id: 9,
                element: 'button',
                name: 'Изменить пароль',
                className: 'btn btnColor offset-4 col-lg-4',
                type: 'button',
                showOnEditPage: true,
                onClick: () => this.props.history.replace('/employee-administration')
            }, {
                id: 10,
                element: 'textarea',
                defaultValueName: 'comment',
                name: 'comment',
                responseDataName: 'profileData',
                className: 'col-lg-12 marginBottom2em',
                placeholder: 'Примечание'
            }, {
                id: 11,
                element: 'fullListComponent',
                responseDataName: 'profileData',
                type: 'search',
                name: 'roles',
                fullListFieldName: 'roleListByCompanyData',
                selectedListFieldName: 'selectedRoleList',
                className: "col-lg-12 row",
                classNameInside: "col-lg-6",
                placeholder: 'Фильтр',
                headline: 'Выбраны',
                labelTopName: 'Вы можете выбрать роль(роли) сотрудника:',
                showOnEditPage: true
            },
            // {
            //     id: 11,
            //     element: 'button',
            //     name: 'Создать нового сотрудника',
            //     className: 'btn btnColor col-lg-3',
            //     type: 'button',
            //     showOnEditPage: true,
            //     onClick: () => this.redirectToAdd()
            // },
            {
                id: 12,
                element: 'button',
                name: 'Назад к списку без сохранения',
                className: 'btn btnColor col-lg-3 offset-3',
                type: 'button',
                onClick: () => this.props.history.replace('/employee-administration')
            }, {
                id: 13,
                element: 'button',
                name: 'Сохранить',
                className: 'btn btnColor col-lg-3',
                type: 'button',
                onClick: this.handleSubmit.bind(this)
            }
        ];
        this.initialize.call(this);
        this.fullListComponentName = 'roles';
    }

    initialize = () => {
        this.props.clearEmployeeCard();
        if (this.isEditPage()) {
            this.props.getRoleListByCompany();
            let id = this.getUserId();
            this.props.getUserProfileById(id);
            this.props.getRoleByUserProfileId(id);
        }
    };

    componentWillUnmount() {
        this.props.clearEmployeeCard();
    }

    handleSubmit() {
        let isEditPage = this.isEditPage(),
            requestBody = createRequestBody(this.employeeCardFields, "profileData_roles", isEditPage);
        requestBody.nodeIds = [];
        requestBody.cashBoxIds = [];
        let requestBodyWithId = {
            ...requestBody,
            id: this.props.profileData.id
        };
        let requestBodyWithRoleList = {
            roles: requestBody.roles,
            id: this.props.profileData.id
        };
        isEditPage ? (this.props.updateProfile(JSON.stringify(requestBodyWithId)) &&
            this.props.addRoleListByUserProfileId(JSON.stringify(requestBodyWithRoleList))):
            this.props.createUserProfile(JSON.stringify(requestBody), this.redirectToEdit);
    };

    redirectToEdit = (id) => {
        this.props.history.push('/employee-administration/edit/' + id);
        this.initialize();
    };

    isEditPage = () => {
        return this.props.match.params && this.props.match.params.id && this.props.type === 'edit'
    };

    getUserCardName = () => {
        return this.isEditPage() ? 'Карточка сотрудника СХ' : 'Новый сотрудник СХ';
    };

    getSaveBtnName = () => {
        return this.isEditPage() ? 'Сохранить' : 'Создать сотрудника';
    };

    getUserId = () => +this.props.match.params.id;

    render() {
        let {profileData, roleListByCompanyData, roleByUserProfileIdData} = this.props,
            isAddPage = !this.isEditPage(),
            roleIdsByUserProfileIdData = roleByUserProfileIdData ? (roleByUserProfileIdData.length ?
                roleByUserProfileIdData.map(role=>role.id) : []) : null,
            userProfileRoles,
            selectedRoleList;
        if(roleIdsByUserProfileIdData && roleListByCompanyData){
            userProfileRoles = {roles: roleIdsByUserProfileIdData};
            selectedRoleList = !isAddPage ? getFullListComponentList(roleListByCompanyData, userProfileRoles, this.fullListComponentName) : [];
        }
        let responseData = {
            profileData,
            isAddPage,
            selectedRoleList,
            roleListByCompanyData
        };

        let filteredEmployeeCardFields = this.isEditPage() ? this.employeeCardFields.filter((employeeCardField) => {
                return !employeeCardField.hideOnEditPage
            })
            : this.employeeCardFields.filter((employeeCardField) => {
                return !employeeCardField.showOnEditPage
            });
        let result = MapDataToFormElementsService.getElementFormService(filteredEmployeeCardFields, responseData);
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
        getRoleByUserProfileId: (id) => dispatch(getRoleByUserProfileId(id)),
        getCompanyById: (companyId) => dispatch(getCompanyById(companyId)),
        createUserProfile: (defaultUserProfileData, redirectToEdit) => dispatch(createUserProfile(defaultUserProfileData, redirectToEdit)),//todo redirectToEdit
        getUserProfileById: (userId) => dispatch(getUserProfileById(userId)),
        updateProfile: (profileRequest) => dispatch(updateProfile(profileRequest)),
        clearEmployeeCard: () => dispatch(clearEmployeeCard()),
        getRoleListByCompany: () => dispatch(getRoleListByCompany()),
        addRoleListByUserProfileId: (request) => dispatch(addRoleListByUserProfileId(request))
    }
};
const mapStateToProps = (state) => {
    return {
        roleByUserProfileIdData: state.employeeCard.roleByUserProfileIdData,
        roleListByCompanyData: state.employeeCard.roleListByCompanyData,
        companyBiIdData: state.employeeCard.companyBiIdData,
        toggleValue: state.toggleComponent.toggleValue,
        moduleRolesData: state.employeeCard.moduleRolesData,
        userRole: state.employeeCard.userRole,
        profileData: state.employeeCard.profileData,
        profileDataInfo: state.employeeCard.profileDataInfo,
        cashBoxList: state.employeeCard.cashBoxList
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCard);
