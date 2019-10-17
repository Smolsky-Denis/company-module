import React from 'react';
import './FullList.module.css'
import ListItem from "./ListItem";
import {connect} from "react-redux";
import {getSearchValue, getSelectedValue} from "../../actions/CardsAction";
import './ModalList.module.css';


class ModalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterData: [...this.props.responseData.zipcodeList],
            searchValue: '',
            selectedFullZipCode: '',
            selectedZipCodeId: ''
        };
        this.responseData = [...this.props.responseData.zipcodeList];
        this.handleChange.bind(this);
    }


    componentDidMount() {
        this.initialize();
        // this.props.responseData;
    };

    initialize() {
        let {responseData} = this.props;
        this.setState({filterData: [...responseData.zipcodeList], searchValue: ""});
    }
    handleChange(e) {
    let searchValue = event.target.value;
        if (searchValue.length) {
            let filterData = this.filterList(this.responseData, searchValue);
            this.setState({filterData, searchValue})
        }
        else {
            this.initialize();
        }
    };
    searchZipCode(e) {
        let selectedZipCodeId = e.currentTarget.id;
        let selectedFullZipCode = e._dispatchInstances.key;
        console.log('$$$$$$$$$$$$$$$$$$$$$ ' + selectedFullZipCode);
        this.props.onSelect(+selectedFullZipCode);
        this.props.onSelectId(+selectedZipCodeId);
        this.setState({
            selectedFullZipCode: selectedFullZipCode,
            selectedZipCodeId: selectedZipCodeId
        });
        this.props.getSelectedValue(selectedFullZipCode, selectedZipCodeId);
    }

    filterList = (responseData, searchValueData) => responseData.filter((dataItem) => {
        return (
            'дер. ' + dataItem.villageName + ', '
            + 'с.о. ' + dataItem.villageDistrictName + ', '
            + 'пос. ' + dataItem.settlementName + ', '
            + 'пгт ' + dataItem.cityTypeSettlementName + ', '
            + 'г. ' + dataItem.cityName + ', '
            + ', ' + dataItem.areaName + ', '
            + ', ' + dataItem.regionName + ', '
            + ', ' + dataItem.republicName
        ).toUpperCase().search(searchValueData.toUpperCase().trim()) >= 0});

    render() {
        let {data} = this.props;
        return (
            <div className={data.className}>
                <label>
                    <input className="form-control" type='search' value={this.state.selectedFullZipCode}
                           placeholder="Введите название населенного пункта в поиск для выбора ATE"
                           onChange={(e) => this.handleChange(e)}
                           disabled="disabled"/>
                </label>
                <label>
                    <input className="form-control" type='search' id={this.state.selectedZipCodeId} value={this.state.searchValue}
                           placeholder="Поиск..."
                           onChange={(e) => this.handleChange(e)}/>
                </label>
                <ul className='list-group modalListGroup list-border-color rounded'>
                    {this.state.filterData.map((dataItem) => {
                        return <li onClick={(e) => this.searchZipCode(e)} className="list-group-item cursorPointer" key={dataItem.fullZipCode} id={dataItem.id}>
                            <label className='cursorPointer'>{
                                (dataItem.villageName ? ('дер. ' + dataItem.villageName + ', ') : '')
                                + (dataItem.villageDistrictName ? ('с.о. ' + dataItem.villageDistrictName + ', ') : '')
                                + (dataItem.settlementName ? ('пос. ' + dataItem.settlementName + ', ') : '')
                                + (dataItem.cityTypeSettlementName ? ('пгт ' + dataItem.cityTypeSettlementName + ', ') : '')
                                + (dataItem.cityName ? ('г. ' + dataItem.cityName + ', ') : '')
                                + (dataItem.areaName ? (dataItem.areaName + ', ') : '')
                                + (dataItem.regionName ? (dataItem.regionName + ', ') : '')
                                + (dataItem.republicName ? (dataItem.republicName) : '')
                            }
                            </label>
                        </li>
                    })
                    }
                </ul>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSelectedValue: (selectedFullZipCode, selectedZipCodeId) => dispatch(getSelectedValue(selectedFullZipCode, selectedZipCodeId))
    }
};
const mapStateToProps = (state) => {
    return {}
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalList);
