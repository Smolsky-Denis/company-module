import React from 'react';
import {connect} from "react-redux";
import Table from "../Employee/EmployeeAdministration/EmployeeAdministration";


class ReferenceDocumentation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='col-lg-9 col-md-8'>
                <h1>ReferenceDocumentation</h1>
                <Table/>
            </div>
        )
    }
}

const mapDispatchToProps = () => {
    return {}
};
const mapStateToProps = () => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(ReferenceDocumentation);