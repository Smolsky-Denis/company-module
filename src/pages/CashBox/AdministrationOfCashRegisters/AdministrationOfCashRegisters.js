import React from 'react';
import {connect} from "react-redux";
import Table from "../../../components/Table/Table";
import SearchForTable from "../../../components/SearchForTable/SearchForTable";
import NavLink from "react-router-dom/es/NavLink";
import {getCashBoxList} from "../../../actions/CashBoxAction";
import {pagination} from "../../../services/utils";


const mapCashBox = (cashBoxList) => {
    let result = [];
    if (cashBoxList && cashBoxList.length) {
        result = cashBoxList.map((cashBox) => {
            cashBox.active = cashBox.active ? 'Активный' : 'Неактивный';
            return {
                ...cashBox,
                nodeName: cashBox.node.name
            }
        })
    }
    return result;
};


class AdministrationOfCashRegisters extends React.Component {
    constructor(props) {
        super(props);
        this.props.getCashBoxList(JSON.stringify(pagination));
    }

    listChange(searchValueData) {
        let searchRequest = {
            ...pagination,
            "boxNumber": {
                "sortEnum": "NONE",
                "value": searchValueData
            }
        };
        this.props.getCashBoxList(JSON.stringify(searchRequest));
    }

    render() {
        let cashBoxList = this.props.cashBoxList;
        if (cashBoxList && cashBoxList.length) {
            cashBoxList = mapCashBox(cashBoxList);
        }

        let columns = [
            {
                dataField: "active",
                label: "Статус",
                dataSort: true
            }, {
                dataField: "name",
                label: "Наименование кассы",
                dataSort: true
            }, {
                isKey: true,
                dataField: "boxNumber",
                label: "№ Кассы",
                dataSort: true
            }, {
                dataField: "nodeName",
                label: "Торговая точка",
                dataSort: true
            }
        ];
        return (
            <div className='col-lg-9 col-md-8'>
                <div className='form-row searchForTable'>
                    <div className='col-lg-2'>
                        <NavLink to={this.props.path + '/add'} className='btn btn-outline-secondary btnColor'>Добавить
                            кассу</NavLink>
                    </div>
                    <SearchForTable listChange={(searchValueData)=>this.listChange(searchValueData)}/>
                </div>
                {cashBoxList && cashBoxList.length ? <Table url={'/administration-of-cash-registers/edit/'} data={cashBoxList}
                           columns={columns}/> : null}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCashBoxList: (cashBoxListRequest) => dispatch(getCashBoxList(cashBoxListRequest)),
    }
};
const mapStateToProps = (state) => {
    return {
        cashBoxList: state.employeeCard.cashBoxList
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AdministrationOfCashRegisters);
