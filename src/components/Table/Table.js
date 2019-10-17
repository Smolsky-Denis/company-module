import React from 'react'
import {connect} from "react-redux";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "./../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css";
import './Table.module.css'
import {withRouter} from "react-router-dom";

function getCaret(direction) {
    if (direction === 'asc') {
        return (
            <div className="arrow-up float-lg-right"/>
        );
    }
    if (direction === 'desc') {
        return (
            <div className="arrow-down float-lg-right"/>
        );
    }
    return (
        <div className='float-lg-right'>
            <div className="arrow-up float-lg-right"/>
            <div className="arrow-down float-lg-right"/>
        </div>
    );
}

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    onRowClick(item) {
        this.props.history.push(this.props.url + item.id);
    }

    renderColumns(columns) {
        return columns.length ? columns.map(headerConfigItem =>
            <TableHeaderColumn caretRender={getCaret} key={headerConfigItem.dataField}
                               isKey={headerConfigItem.isKey} dataFormat={headerConfigItem.dataFormatter}
                               hidden={headerConfigItem.hidden} dataField={headerConfigItem.dataField}
                               dataSort={headerConfigItem.dataSort}>
                {headerConfigItem.label}</TableHeaderColumn>) : null;
    }


    render() {

        let {columns, data} = this.props;
        const options = {
            onRowClick: this.onRowClick.bind(this)
        };
        return (
            <div>{data && columns ?
                <BootstrapTable data={data} striped hover scrollTop={'Bottom'} options={options}>
                    {columns && columns.length ? this.renderColumns.call(this, columns) : null}
                </BootstrapTable> : null}
            </div>)
    }

}

const mapDispatchToProps = () => {
    return {}
};

const mapStateToProps = () => {
    return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Table));
