import React from 'react';
import {connect} from "react-redux";
import {createRequestBody, MapDataToFormElementsService} from "../../services/utils";
import {withRouter} from "react-router-dom";

class ATE extends React.Component {
    constructor(props) {
        super(props);
        this.ateFields = [
            {
                id: 0,
                name: 'cardName',
                element: 'headline',
                className: 'col-lg-12 marginBottom1em',
                headline: 'Выбор кода ATE'
            }, {
                id: 1,
                name: 'cardName',
                // element: 'list',
                element: 'modalList',
                // responseDataName: 'nodeByIdData',
                className: 'col-lg-12 marginBottom1em',
                headline: 'Выбор кода ATE',
                onSelect: (selectedFullZipCode) => {
                    this.setState({selectedFullZipCode: selectedFullZipCode,
                        // zipCodeId: zipCodeId
                    })
                },
                onSelectId: (selectedZipCodeId) => {
                    this.setState ({selectedZipCodeId: selectedZipCodeId})
                }
            },
            {
                id: 2,
                element: 'button',
                name: 'Отмена',
                className: 'btn btnColor col-lg-3',
                type: 'button',
                onClick: this.cancel.bind(this)
                // onClick: this.redirectToPage().bind(this)
            },
            {
                id: 3,
                element: 'button',
                name: 'Выбрать',
                className: 'btn btnColor offset-9 col-lg-3',
                type: 'button',
                onClick: this.handleSubmit.bind(this)
            }
        ]
    }
    initialize() {
       return this.props.zipcodeList && this.props.zipcodeList.length;
    }
    componentDidMount() {
        this.initialize();
    }
    componentDidUpdate() {
        this.initialize();
    }

    handleSubmit() {
        this.props.handleSubmit({
            selectedFullZipCode: this.state.selectedFullZipCode,
            selectedZipCodeId: this.state.selectedZipCodeId
        });
        this.props.hide();
    };
    cancel() {
        this.props.hide();
    }

    render() {
        let {zipcodeList} = this.props,
            responseData = {
                zipcodeList
            },
            result = MapDataToFormElementsService.getElementFormService(this.ateFields, responseData);
        return (
            <div className="form-row">
                {result}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {};
};

const mapStateToProps = (state) => {
    return {
        selectedFullZipCode: state.nodeCard.selectedFullZipCode,
        selectedZipCodeId: state.nodeCard.selectedZipCodeId
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ATE));
