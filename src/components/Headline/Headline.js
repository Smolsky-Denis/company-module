import React from 'react';
import {connect} from "react-redux";


class Headline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {headline, className, classNameInside, sizeFont} = this.props.data;
        return (
            <div className={` ${className || classNameInside || 'col-lg-4'}`}>
                <span className={sizeFont || "h4"}>{headline}</span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
};
const mapStateToProps = (state) => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(Headline);
