import React from 'react';
import {connect} from "react-redux";
import {
    createRequestBody,
    getFullListComponentList,
    MapDataToFormElementsService,
    mapUserList,
    pagination
} from "../../services/utils";
import {clearNodeCard, createNode, nodeById, updateNode} from "../../actions/NodeAction";
import {getZipcodeList} from "../../actions/dictionaryAction";
import {getAllProfileList} from "../../actions/UserProfileAction";
import ATE from "../ATE/ATE";

class NodeCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFullZipCode: '',
            selectedZipCodeId: ''
        };
        this.fullListComponentName = "userIds";
        this.initialize();
        this.nodeCardFields = [
            {
                id: 0,
                name: 'cardName',
                element: 'headline',
                className: 'col-lg-5 marginBottom1em',
                headline: 'Карточка Торговой точки'
            }, {
                id: 1,
                element: 'toggle',
                className: 'col-lg-7',
                name: 'nodeTypeId',
                labelName: 'Склад',
                responseDataName: 'nodeByIdData',
                defaultValueName: 'nodeType',
                useObject: {
                    value: "id",
                    values: [2, 1]
                }
            }, {
                id: 2,
                name: 'name',
                responseDataName: 'nodeByIdData',
                element: 'input',
                type: 'text',
                className: 'col-lg-8',
                placeholder: 'Наименование',
                labelName: 'Наименование'
            }, {
                id: 3,
                element: 'button',
                name: 'Удалить торговую точку / Склад',
                className: 'btn btnColor col-lg-4',
                type: 'button',
                onClick: function () {

                }
            },
            // {
            //     id: 4,
            //     name: '',//todo заменить zipCodId
            //     element: 'inputPlusButton',
            //     className: 'col-lg-4',
            //     type: 'text'
            // },

            {
                id: 5,
                name: 'zipCodeId',
                element: 'inputButton',
                value: this.state.selectedFullZipCode,
                disabled: true,
                selectId: '',
                responseDataName: 'nodeByIdData',
                labelName: 'Административно-территор-я ед.',
                buttonName: 'Выбрать',
                className: 'col-lg-4',
                showContent: (handleSubmit, hide) => <ATE handleSubmit={this.modalSelect.bind(this)} hide={hide} zipcodeList={this.props.zipcodeList}/>, // заменить на другой компонент и использовать handleSubmit
                modalWindowIsOpen: false,
                toggleModalWindow: function(val){
                    this.modalWindowIsOpen = val;
                },
                getModalWindowIsOpen: function(){
                    return this.modalWindowIsOpen
                }
            },
            // {
            //     id: 5,
            //     name: 'zipCodeId',
            //     responseDataName: 'nodeByIdData',
            //     defaultValueName: 'zipCode',
            //     optionListName: 'zipcodeList',
            //     element: 'select',
            //     type: 'text',
            //     className: 'col-lg-4',
            //     labelName: 'Административная территор-я ед.'
            // },
            {
                id: 6,
                name: 'actualAddress',
                responseDataName: 'nodeByIdData',
                element: 'input',
                type: 'text',
                className: 'col-lg-8',
                labelName: 'Адрес'
            }, {
                id: 7,
                element: 'fullListComponent',
                responseDataName: 'nodeByIdData',
                type: 'search',
                name: 'userIds',
                fullListFieldName: 'userProfileList',
                selectedListFieldName: 'selectedUserProfileList',
                className: "col-lg-12 row",
                classNameInside: "col-lg-6",
                placeholder: 'Фильтр',
                headline: 'Выбраны',
                labelTopName: 'Сотрудники:',
            }, {
                id: 8,
                element: 'textarea',
                responseDataName: 'nodeByIdData',
                name: 'comment',
                className: 'col-lg-12 marginBottom2em',
                placeholder: 'Примечание'
            }, {
                id: 9,
                element: 'button',
                name: 'Назад к списку без сохранения',
                className: 'btn btnColor col-lg-3',
                type: 'button',
                onClick: () => this.props.history.replace('/nodes')
            }, {
                id: 10,
                element: 'button',
                name: 'Сохранить',
                className: 'btn btnColor col-lg-3',
                type: 'button',
                onClick: this.handleSubmit.bind(this)
            }
        ];
    }

    initialize() {
        this.props.clearNodeCard();
        this.props.getZipcodeList();
        this.props.getAllProfileList(JSON.stringify(pagination));
        if (this.isEditPage()) this.props.nodeById(this.getUrlParam());
    }

    componentWillUnmount() {
        this.props.getZipcodeList();
        this.props.clearNodeCard();
    }

    modalSelect(value) {
        // debugger
        this.setState({selectedFullZipCode: value.selectedFullZipCode,
        selectedZipCodeId: value.selectedZipCodeId});
        console.warn('modal selected', value, this.state)
        this.modalWindowIsOpen = false;
    }

    handleSubmit() {
        let requestBody = createRequestBody(this.nodeCardFields, "nodeByIdData_userIds");
        requestBody.zipCodeId = this.state.selectedZipCodeId;
        let requestBodyWithId = {
            ...requestBody,
            id: this.props.nodeByIdData.id
        };
        this.isEditPage() ? this.props.updateNode(JSON.stringify(requestBodyWithId))
            : this.props.createNode(JSON.stringify(requestBody), this.redirectToPage);
    };

    getUrlParam = () => this.props.match && this.props.match.params && this.props.match.params.id && +this.props.match.params.id;

    isEditPage = () => this.getUrlParam() && this.props.type === 'edit';

    redirectToPage = (id) => {
        this.props.history.push('/nodes' + (id ? ('/edit/' + id) : "/add"));
        this.initialize();
    };

    render() {
        let {zipcodeList, nodeByIdData} = this.props,
            userProfileList = mapUserList(this.props.userProfileList),
            isAddPage = !this.isEditPage(),
            selectedUserProfileList = !isAddPage ? getFullListComponentList(userProfileList, nodeByIdData, this.fullListComponentName) : [],
            responseData = {
                userProfileList,
                zipcodeList,
                nodeByIdData,
                selectedUserProfileList,
                isAddPage,
            };
        nodeByIdData.zipCodeId = this.state.selectedFullZipCode;
        let result = MapDataToFormElementsService.getElementFormService(this.nodeCardFields, responseData);
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
        createNode: (createNodeData, redirectToEdit) => dispatch(createNode(createNodeData, redirectToEdit)),
        getZipcodeList: () => dispatch(getZipcodeList()),
        updateNode: (updateNodeData) => dispatch(updateNode(updateNodeData)),
        nodeById: (nodeId) => dispatch(nodeById(nodeId)),
        getAllProfileList: (pagination) => dispatch(getAllProfileList(pagination)),
        clearNodeCard: () => dispatch(clearNodeCard())
    };
};

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        userProfileList: state.cashBoxCard.userProfileList,
        nodeData: state.nodeCard.nodeData,
        zipcode: state.nodeCard.zipcode,
        zipcodeList: state.nodeCard.zipcodeList,
        nodeByIdData: state.nodeCard.nodeByIdData,
        selectedValue: state.nodeCard.selectedValue,
        selectedZipCodeId: state.nodeCard.selectedZipCodeId,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NodeCard);
