import React from 'react';
import {connect} from "react-redux";
import SearchForTable from "../../components/SearchForTable/SearchForTable";
import {getNodesList} from "../../actions/NodeAction";
import Table from "../../components/Table/Table";
import {NavLink} from "react-router-dom";
import {pagination} from "../../services/utils";



const mapNodeList = (nodeList) => {
    let result = [];
    if (nodeList && nodeList.length) {
        result = nodeList.map((node) => {
            return {
                ...node
            }
        })
    }
    return result;
};

class Nodes extends React.Component {
    constructor(props) {
        super(props);
        this.props.getNodesList(JSON.stringify(pagination));
        this.listChange.bind(this);
    }

    listChange(searchValueData) {
        let searchRequest = {
            ...pagination,
            "actualAddress": {
                "sortEnum": "NONE",
                "value": searchValueData
            }
        };
        this.props.getNodesList(JSON.stringify(searchRequest));
    }

    render() {
        let columns = [
            {
                isKey: true,
                dataField: 'id',
                label: 'Id',
                hidden: true
            },
            // {
            //     dataField: "Module",
            //     label: "Модуль",
            //     dataSort: true
            // },
            {
                dataField: "zipCode",
                label: "АТЕ",
                dataFormatter: function (cell, row) {
                    return cell && cell.name;
                },
                dataSort: true
            },
            {
                dataField: "name",
                label: "Наименование",
                dataSort: true
            }, {
                dataField: "actualAddress",
                label: "Адрес",
                dataSort: true
            }
        ];
        let {nodeList, path} = this.props;
        return (
            <div className='col-lg-9 col-md-8'>
                <div className='form-row searchForTable'>
                    <div className='col-lg-2'>
                        <NavLink to={path + '/add'} className='btn btn-outline-secondary btnColor'>Добавить</NavLink>
                    </div>
                    <SearchForTable listChange={(searchValueData)=>this.listChange(searchValueData)}/>
                </div>
                {nodeList && nodeList.length ?
                    <Table url={'/nodes/edit/'} data={mapNodeList(nodeList)}
                           columns={columns}/> : null}
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getNodesList: (NodeListRequest) => dispatch(getNodesList(NodeListRequest))
    }
};
const mapStateToProps = (state) => {
    return {
        nodeList: state.nodeCard.nodeList
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Nodes);
