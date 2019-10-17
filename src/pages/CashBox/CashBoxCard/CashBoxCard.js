import React from 'react';
import {connect} from "react-redux";
import {
    createRequestBody,
    getFullListComponentList,
    MapDataToFormElementsService,
    mapUserList,
    pagination
} from "../../../services/utils";
import './CashBoxCard.module.css';
import {clearCashBox, createCashBox, getGetCashBoxById, updateCashBox} from "../../../actions/CashBoxAction";
import {getNodesList} from "../../../actions/NodeAction";
import {getAllProfileList} from "../../../actions/UserProfileAction";


class CashBoxCard extends React.Component {
    constructor(props) {
        super(props);
        this.fullListComponentName = "userProfileIds";
        this.initialize();
        this.cashBoxFields = [
            {
                id: 0,
                name: 'cardName',
                element: 'headline',
                className: 'col-lg-4 marginBottom1em',
                headline: 'Карточка кассы'
            }, {
                id: 1,
                name: 'boxNumber',
                element: 'input',
                responseDataName: 'cashBoxDataById',
                type: 'text',
                className: 'col-lg-8',
                placeholder: 'Номер кассы'
            }, {
                id: 2,
                name: 'name',
                element: 'input',
                responseDataName: 'cashBoxDataById',
                type: 'text',
                className: 'col-lg-5',
                placeholder: 'Наименование кассы'
            }, {
                id: 3,
                name: 'date',
                element: 'input',
                type: 'date',
                className: 'col-lg-2'
            }, {
                id: 4,
                name: 'nodeId',
                responseDataName: 'cashBoxDataById',
                type: 'text',
                element: 'select',
                defaultValueName: 'node',
                optionListName: 'nodeList',
                className: 'col-lg-5',
            }, {
                id: 5,
                element: 'fullListComponent',
                responseDataName: 'cashBoxDataById',
                type: 'search',
                name: 'userProfileIds',
                fullListFieldName: 'userProfileList',
                selectedListFieldName: 'selectedUserProfileList',
                className: "col-lg-12 row",
                classNameInside: "col-lg-6",
                placeholder: 'Фильтр',
                headline: 'Выбраны',
                labelTopName: 'Сотрудники уполномоченные работать с кассой:',
                // classNameForSearch: 'col-lg-6',
                request: ''
            }, {
                id: 6,
                element: 'textarea',
                name: 'comment',
                className: 'col-lg-12 marginBottom2em',
                placeholder: 'Примечание'
            }, {
                id: 7,
                element: 'toggle',
                responseDataName: 'cashBoxDataById',
                className: 'col-lg-2',
                name: 'active',
                labelName: 'Активна',
                defaultValueName: 'active',
            }, {
                id: 8,
                element: 'button',
                name: 'Назад к списку без сохранения',
                className: 'btn btnColor col-lg-3 offset-1',
                type: 'button',
                onClick: () =>  this.props.history.replace('/administration-of-cash-registers')
            },
            // todo check url in history
            // {
            //     id: 9,
            //     element: 'button',
            //     name: 'Добавить еще одну',
            //     className: 'btn btnColor col-lg-3',
            //     type: 'button',
            //     onClick: () => this.redirectToPage()
            // },
            {
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
        this.props.clearCashBox();
        this.props.getAllProfileList(JSON.stringify(pagination));
        this.props.getNodesList(JSON.stringify(pagination));
        if (this.isEditPage()) this.props.getGetCashBoxById(this.getUrlParam());
    }

    componentWillUnmount() {
        this.props.clearCashBox();
    }

    handleSubmit() {
        let requestBody = createRequestBody(this.cashBoxFields, "cashBoxDataById_userProfileIds");
        delete requestBody.date;
        delete requestBody.comment;
        let requestBodyWithId = {
            ...requestBody,
            id: this.props.cashBoxDataById.id
        };
        this.isEditPage() ? this.props.updateCashBox(JSON.stringify(requestBodyWithId))
            : this.props.createCashBox(JSON.stringify(requestBody), this.redirectToPage);
    };

    redirectToPage = (id) => {
        this.props.history.push('/administration-of-cash-registers' + (id ? ('/edit/' + id) : "/add"));
        this.initialize();
    };

    getUrlParam = () => this.props.match && this.props.match.params
        && this.props.match.params.id && +this.props.match.params.id;

    isEditPage = () => {
        return this.getUrlParam() && this.props.type === 'edit'
    };

    render() {
        let {nodeList, cashBoxDataById} = this.props,
            userProfileList = mapUserList(this.props.userProfileList),
            isAddPage = !this.isEditPage(),
            selectedUserProfileList = !isAddPage ? getFullListComponentList(userProfileList, cashBoxDataById, this.fullListComponentName) : [],
            responseData = {
                userProfileList,
                selectedUserProfileList,
                nodeList,
                cashBoxDataById,
                isAddPage
            };

        let result = MapDataToFormElementsService.getElementFormService(this.cashBoxFields, responseData);

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
        clearCashBox: () => dispatch(clearCashBox()),
        createCashBox: (createCashBoxData, redirectToPage) => dispatch(createCashBox(createCashBoxData, redirectToPage)),
        getGetCashBoxById: (cashBoxId) => dispatch(getGetCashBoxById(cashBoxId)),
        updateCashBox: (updateCashBoxData) => dispatch(updateCashBox(updateCashBoxData)),
        getNodesList: (NodeListRequest) => dispatch(getNodesList(NodeListRequest)),
        getAllProfileList: (request) => dispatch(getAllProfileList(request)),
    }
};
const mapStateToProps = (state) => {
    return {
        cashBoxDataById: state.cashBoxCard.cashBoxDataById,
        userProfileList: state.cashBoxCard.userProfileList,
        nodeList: state.cashBoxCard.nodeList,
        nodeByIdData: state.cashBoxCard.nodeByIdData
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CashBoxCard);
