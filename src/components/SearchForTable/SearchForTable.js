import React from 'react';
import {connect} from 'react-redux';
import {getSearchValue} from "../../actions/CardsAction";


class SearchForTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange.bind(this);
    }

    handleChange(e) {
        // Note: with uncontrolled inputs, you don't
        // have to put the value in the state.
        let value = event.target.value;
        if(this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => this.props.getSearchValue({value}, this.props.listChange),350);
    }
    render() {
        return (
            <div className="offset-6 col-lg-4">
                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                       aria-label="Search" onChange={(e) => this.handleChange(e)}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSearchValue: (searchValue, listChange) => dispatch(getSearchValue(searchValue, listChange))
    }
};

const mapStateToProps = (state) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForTable);
