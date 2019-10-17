import React from 'react'
import {connect} from "react-redux";


class TableRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <td>
               Test TableRow
            </td>
        )
    }

}


const mapDispatchToProps = () => {
    return {}
};

const mapStateToProps = () => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
