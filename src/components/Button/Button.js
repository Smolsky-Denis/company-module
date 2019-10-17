import React from 'react';
import {connect} from "react-redux";


class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {name, className, type, onClick} = this.props.data;
        return (
                <button type={type} className={className} onClick={onClick}>{name}</button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
};
const mapStateToProps = (state) => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(Button);
