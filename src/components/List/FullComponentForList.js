import React from 'react';
import {connect} from "react-redux";
import FullList from "./FullList";
import './FullComponentforList.module.css'
import {getSearchValue} from "../../actions/CardsAction";

class FullComponentForList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullList: [],
            selectedList: [],
            searchValue: ""
        };
        this.handleChange.bind(this);
    }

    initialize() {
        let {responseData, data} = this.props,
            fullList = responseData[data.fullListFieldName],
            selectedList = responseData[data.selectedListFieldName];
        fullList = fullList.filter((fullListItem) => !selectedList.some((selectedItem) => selectedItem.id === fullListItem.id));
        this.setState({fullList, selectedList, searchValue: ""});
    }

    componentDidMount() {
        this.initialize();
    }

    updateFullList = (fullList, removedItem) => {
        let selectedList = this.state.selectedList;
        selectedList.push(removedItem);
        this.setState({fullList, selectedList});
    };
    updateSelectedList = (selectedList, removedItem) => {
        let fullList = this.state.fullList;
        fullList.push(removedItem);
        this.setState({selectedList, fullList});
    };

    handleChange(e) {
        // Note: with uncontrolled inputs, you don't
        // have to put the value in the state.
        let searchValue = event.target.value;
        if (searchValue.length) {
            let filteredFullList = this.filterList(this.state.fullList, searchValue);
            this.setState({fullList: filteredFullList, searchValue});
        } else {
            this.initialize();
        }

    }

    filterList = (listData, searchValueData) => listData.filter((item) => item.name.toUpperCase().search(searchValueData.toUpperCase().trim()) >= 0);

    render() {
        let {data, uniqueKey} = this.props,
            {fullList, selectedList} = this.state;
        return (
            <div className={`margin-bottom-full-list-comp ${data.className}`}>
                <div className={data.classNameInside}>
                    <div className="form-group">
                        <label className='paddingBottomFullListSearch'>
                            <input className="form-control" type={data.type} value={this.state.searchValue} placeholder="Поиск..."
                                   onChange={(e) => this.handleChange(e)}/>
                        </label>
                    </div>
                    <FullList data={data} responseData={fullList} updateResponseData={this.updateFullList}/>
                </div>
                <div className={`padding-top-FullList ${data.classNameInside}`} id={uniqueKey}>
                    <p>{data.headline}</p>
                    <FullList data={data} responseData={selectedList} updateResponseData={this.updateSelectedList}/>
                    <div/>
                </div>
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
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(FullComponentForList);
