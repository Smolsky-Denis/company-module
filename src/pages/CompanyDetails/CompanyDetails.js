import React from 'react';
import {connect} from "react-redux";
import {getCompanyById, updateCompany} from "../../actions/CompanyAction";
import {createRequestBody, MapDataToFormElementsService} from "../../services/utils";
import {
    getLegalFormList,
    getTaxationSystemList,
    getTaxAuthorityList,
    getZipcodeList
} from "../../actions/dictionaryAction";
import {withRouter} from "react-router-dom";


class CompanyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.companyFields = [
            {
                id: 0,
                name: 'cardName',
                element: 'headline',
                className: 'col-lg-12 marginBottom1em',
                headline: 'Сведения о компании'
            }, {
                id: 1,
                name: 'legalFormId',
                responseDataName: 'companyBiIdData',
                type: 'text',
                element: 'select',
                defaultValueName: 'legalForm',
                optionListName: 'legalFormList',
                labelName: 'Организационно-прововая форма',
                className: 'col-lg-4',
            }, {
                id: 2,
                name: 'fullName',
                element: 'input',
                responseDataName: 'companyBiIdData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Наименование'
            }, {
                id: 3,
                name: 'zipCodeId',
                responseDataName: 'companyBiIdData',
                defaultValueName: 'zipCode',
                optionListName: 'zipcodeList',
                element: 'select',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Административная территор-я ед.'
            }, {
                id: 4,
                name: 'inn',
                element: 'input',
                responseDataName: 'companyBiIdData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'ИНН',
                disabled: () => true
            }, {
                id: 5,
                name: 'shortName',
                element: 'input',
                responseDataName: 'companyBiIdData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Сокращенное наименование'
            }, {
                id: 6,
                name: 'taxAuthorityId',
                responseDataName: 'companyBiIdData',
                type: 'text',
                element: 'select',
                defaultValueName: 'taxAuthority',
                optionListName: 'taxAuthorityList',
                labelName: 'Налоговый орган',
                className: 'col-lg-4',
            }, {
                id: 7,
                name: 'legalAddress',
                element: 'input',
                responseDataName: 'companyBiIdData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Юридический адрес'
            }, {
                id: 8,
                name: 'actualAddress',
                element: 'input',
                responseDataName: 'companyBiIdData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Фактический адрес'
            }, {
                id: 9,
                name: 'taxationSystemId',
                responseDataName: 'companyBiIdData',
                type: 'text',
                element: 'select',
                defaultValueName: 'taxationSystem',
                optionListName: 'taxationSystemList',
                className: 'col-lg-4',
                labelName: 'Система налогооблажения'
            }, {
                id: 10,
                name: 'phoneNumber',
                element: 'input',
                responseDataName: 'companyBiIdData',
                type: 'number',
                className: 'col-lg-4',
                labelName: 'Телефон'
            }, {
                id: 11,
                element: 'input',
                name: 'email',
                responseDataName: 'companyBiIdData',
                type: 'email',
                className: 'col-lg-4',
                labelName: 'E-mail'
            }, {
                id: 12,
                name: 'comment',
                element: 'headline',
                className: 'col-lg-4 marginBottom1em',
                sizeFont: 'h6',
                headline: 'Внимание: на указанный e-mail высылаются все сообщения от системы в адрес вашей компании'
            }, {
                id: 13,
                name: 'directorPosition',
                element: 'input',
                responseDataName: 'companyBiIdData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Должность'
            }, {
                id: 14,
                name: 'directorFullName',
                element: 'input',
                responseDataName: 'companyBiIdData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'ФИО'
            }, {
                id: 15,
                name: 'directorReason',
                element: 'input',
                responseDataName: 'companyBiIdData',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Действует на основании'
            },
            // {
            //     id: 16,
            //     name: 'active',
            //     element: 'toggle',
            //     className: 'col-lg-4',
            //     labelName: 'Касса',
            //     responseDataName: 'profileData',
            //     defaultValueName: 'active'
            // }, {
            //     id: 17,
            //     name: 'active',
            //     element: 'toggle',
            //     className: 'col-lg-4',
            //     labelName: 'Маркировка',
            //     responseDataName: 'profileData',
            //     defaultValueName: 'active'
            // },
            {
                id: 18,
                element: 'button',
                name: 'Изменение данных СХ',
                className: 'btn btnColor col-lg-3 offset-3',
                type: 'button',
                onClick: this.handleSubmit.bind(this)
            }, {
                id: 19,
                element: 'button',
                name: 'Выйти',
                className: 'btn btnColor col-lg-3',
                type: 'button',
                onClick: this.redirectToMain.bind(this)
            },
        ];
        this.initialize.call(this);
    }

    initialize = () => {
        this.props.getTaxAuthorityList();
        this.props.getTaxationSystemList();
        this.props.getZipcodeList();
        this.props.getLegalFormList();
    };

    componentWillUnmount() {
        this.props.getCompanyById(1);
        // this.props.clearEmployeeCard();
    };

    redirectToMain = (id) => {
        this.props.history.push('/administration-of-cash-registers');
        this.initialize();
    };

    handleSubmit(redirectToMain) {
        let requestBody = createRequestBody(this.companyFields);
        delete requestBody.inn;
        delete requestBody.fullName;
        delete requestBody.shortName;
        let requestBodyWithId = {
            ...requestBody,
            id: this.props.companyBiIdData.id
        };
        this.props.updateCompany(JSON.stringify(requestBodyWithId));
    };


    // getUserId = () => +this.props.match.params.id;

    render() {
        let {companyBiIdData, taxAuthorityList, taxationSystemList, zipcodeList, legalFormList} = this.props,
            responseData = {
                companyBiIdData,
                taxAuthorityList,
                taxationSystemList,
                zipcodeList,
                legalFormList
            };

        let result = MapDataToFormElementsService.getElementFormService(this.companyFields, responseData);
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
        updateCompany: (updateCompanyRequestData, redirectToMain) => dispatch(updateCompany(updateCompanyRequestData), redirectToMain),
        getCompanyById: (id) => dispatch(getCompanyById(id)),
        getTaxAuthorityList: () => dispatch(getTaxAuthorityList()),
        getTaxationSystemList: () => dispatch(getTaxationSystemList()),
        getZipcodeList: () => dispatch(getZipcodeList()),
        getLegalFormList: () => dispatch(getLegalFormList()),
    }
};
const mapStateToProps = (state) => {
    return {
        companyData: state.companyDetails.companyData,
        companyBiIdData: state.companyDetails.companyBiIdData,
        taxAuthorityList: state.companyDetails.taxAuthorityList,
        taxationSystemList: state.companyDetails.taxationSystemList,
        zipcodeList: state.companyDetails.zipcodeList,
        legalFormList: state.companyDetails.legalFormList,
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyDetails));
