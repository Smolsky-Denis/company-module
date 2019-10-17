import React from 'react';
import {connect} from "react-redux";
import {
    createRequestBody,
    getFullListComponentList,
    MapDataToFormElementsService,
    mapUserList,
    pagination
} from "../../services/utils";
import {
    clearNodeCard,
    getNodesList, nodeById, updateNode
} from "../../actions/NodeAction";
import {getAllProfileList, getUserProfileById} from "../../actions/UserProfileAction";

class MarkingCard extends React.Component {
    constructor(props) {
        super(props);
        this.fullListComponentName = "userIds";
        this.initialize();
        this.markCardFields = [
            {
                id: 0,
                name: 'cardName',
                element: 'headline',
                className: 'col-lg-12 marginBottom1em',
                headline: 'Администрирование персонала модуля "Маркировка"'
            }, {
                id: 1,
                name: 'zipCodeId',
                responseDataName: 'nodeByIdData',
                defaultValueName: 'zipCode',
                // defaultValueNameIsId: true,
                optionListName: 'nodeList',
                handleChange: (value) => {
                    setTimeout(() => this.redirectToPage(value))
                },
                element: 'select',
                add: true,
                firstValue: 'Выберите торговую точку/склад',
                editPath: '/marking/edit/',
                type: 'text',
                className: 'col-lg-4',
                labelName: 'Выберите торговую точку/склад',
                hideOnEditPage: true
            },
            {
                id: 2,
                element: 'toggle',
                className: 'offset-4 col-lg-4',
                name: 'nodeTypeId',
                responseDataName: 'nodeByIdData',
                defaultValueName: 'nodeType',
                leftValue: 'Склад',
                rightValue: 'Торговая точка',
                useObject: {
                    value: "id",
                    values: [1, 2]
                }
            },
            // {
            //     id: 2,
            //     name: 'nodeTypeName',
            //     element: 'input',
            //     responseDataName: 'nodeByIdData',
            //     type: 'text',
            //     className: 'col-lg-4',
            //     labelName: 'Тип',
            //     placeholder: 'Тип',
            //     disabled: () => true // todo редактируемое?
            // },
            // {
            //     id: 3,
            //     name: 'name',
            //     responseDataName: 'nodeByIdData',
            //     element: 'input',
            //     type: 'text',
            //     className: 'col-lg-6',
            //     placeholder: 'Наименование',
            //     labelName: 'Наименование'
            // },
            {
                id: 4,
                name: 'actualAddress',
                element: 'input',
                responseDataName: 'nodeByIdData',
                type: 'text',
                className: 'col-lg-6',
                placeholder: 'Адрес',
                labelName: 'Адрес',
                disabled: () => true
            }, {
                id: 5,
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
                showOnEditPage: true,
                labelTopName: 'Сотрудники:',
            }, {
                id: 6,
                element: 'textarea',
                responseDataName: 'nodeByIdData',
                name: 'comment',
                className: 'col-lg-12 marginBottom2em',
                placeholder: 'Примечание'
            },{
                id: 7,
                element: 'button',
                name: 'Выйти без сохранения',
                className: 'btn btnColor col-lg-3',
                type: 'button',
                onClick: () => this.props.history.replace('/nodes')
            }, {
                id: 8,
                element: 'button',
                name: 'Назначить сотрудников',
                className: 'btn btnColor col-lg-3',
                type: 'button',
                onClick: this.handleSubmit.bind(this)
            }
        ];
    }

    initialize() {
        this.props.clearNodeCard();
        this.props.getNodesList(JSON.stringify(pagination));
        this.props.getAllProfileList(JSON.stringify(pagination));

        if (this.isEditPage()) {
            let id = this.getUrlParam();
            this.props.getAllProfileList(JSON.stringify(pagination));
            this.props.nodeById(id, this.props.nodeByIdData)
        }
    }

    componentWillUnmount() {
        this.props.clearNodeCard();
    }

    handleSubmit() {
        let requestBody = createRequestBody(this.markCardFields, "nodeByIdData_userIds", this.isEditPage());
        // delete requestBody.comment;
        // delete requestBody.zipCode;
        requestBody.name = this.props.nodeByIdData.name;
        requestBody.zipCodeId = this.props.nodeByIdData.zipCode.id;
        let requestBodyWithId = {
            ...requestBody,
            id: this.props.nodeByIdData.id
        };
        this.isEditPage() ? this.props.updateNode(JSON.stringify(requestBodyWithId)) : null
        // this.props.createUserProfileRole(JSON.stringify(requestBody), this.redirectToPage);
    };

    getUrlParam = () => this.props.match && this.props.match.params && this.props.match.params.id && +this.props.match.params.id;
    isEditPage = () => this.getUrlParam() && this.props.type === 'edit';
    redirectToPage = (id) => {
        this.props.history.push('/marking' + (id ? ('/edit/' + id) : ""));
        this.initialize();
    };

    render() {

        let {nodeByIdData, nodeList} = this.props,
            isAddPage = !this.isEditPage(),
            userProfileList = mapUserList(this.props.userProfileList),
            selectedUserProfileList = !isAddPage ? getFullListComponentList(userProfileList, nodeByIdData, this.fullListComponentName) : [];
        let responseData = {
            isAddPage,
            nodeList,
            nodeByIdData,
            userProfileList,
            selectedUserProfileList
        };

        let result = MapDataToFormElementsService.getElementFormService(this.markCardFields, responseData);
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
        nodeById: (nodeId) => dispatch(nodeById(nodeId)),
        getNodesList: (NodeListRequest) => dispatch(getNodesList(NodeListRequest)),
        getAllProfileList: (profileListRequest) => dispatch(getAllProfileList(profileListRequest)),
        getUserProfileById: (userId) => dispatch(getUserProfileById(userId)),
        updateNode: (updateNodeRequest) => dispatch(updateNode(updateNodeRequest)),
        clearNodeCard: () => dispatch(clearNodeCard())
    };
};

const mapStateToProps = (state) => {
    return {
        nodeByIdData: state.markingCard.nodeByIdData,
        nodeList: state.markingCard.nodeList,
        userProfileList: state.markingCard.userProfileList,
        updateNodeData: state.markingCard.updateNodeData,
        profileData: state.markingCard.profileData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkingCard);
