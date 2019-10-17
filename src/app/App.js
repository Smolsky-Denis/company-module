import React from 'react';
import Route from "react-router-dom/es/Route";
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../../node_modules/bootstrap/dist/js/bootstrap';
import "./scss/main.scss";
import OcrCmUser from "../pages/OcrCmUser/OcrCmUser";
import NavBar from "../components/NavBar/NavBar";
import EmployeeAdministration from "../pages/Employee/EmployeeAdministration/EmployeeAdministration";
import {Redirect, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Modal from "../components/Modal/Modal";
import EmployeeCard from "../pages/Employee/EmployeeCard/EmployeeCard";
import {toggleModalWindow} from "../actions/ModalWindowAction";
import RoleCard from "../pages/RoleCard/RoleCard";
import Nodes from "../pages/NodeCard/Nodes";
import NodeCard from "../pages/NodeCard/NodeCard";
import AdministrationOfCashRegisters
    from "../pages/CashBox/AdministrationOfCashRegisters/AdministrationOfCashRegisters";
import CashBoxCard from "../pages/CashBox/CashBoxCard/CashBoxCard";
import MarkingCard from "../pages/MarkingCard/MarkingCard";
import CompanyDetails from "../pages/CompanyDetails/CompanyDetails";


class App extends React.Component {
    constructor(props) {
        super(props);
    };

    toggleModal = (value) => {
        this.props.toggleModalWindow(value);
    };

    render() {
        return (
            <div className='container-fluid'>
                <NavBar className='navBar'/>
                <section className='form-row content'>
                    <OcrCmUser/>
                    <Route exact path='/' render={() => <Redirect from="/" to="/administration-of-cash-registers"/>}/>
                    <Switch>
                        <Route path='/employee-administration' render={() =>
                            <Switch>
                                <Route exact path='/employee-administration'
                                       render={() => <EmployeeAdministration path={'/employee-administration'}/>}/>
                                <Route path='/employee-administration/add'
                                       render={(props) => <EmployeeCard {...props} type={'add'}/>}/>
                                <Route path='/employee-administration/edit/:id'
                                       render={(props) => <EmployeeCard {...props} type={'edit'}/>}/>
                            </Switch>}
                        />
                    </Switch>
                    <Route path='/administration-of-cash-registers' render={() =>
                        <Switch>
                            <Route exact path='/administration-of-cash-registers'
                                   render={() => <AdministrationOfCashRegisters
                                       path={'/administration-of-cash-registers'}/>}/>
                            <Route path='/administration-of-cash-registers/add'
                                   render={(props) => <CashBoxCard {...props} type={'add'}/>}/>
                            <Route path='/administration-of-cash-registers/edit/:id'
                                   render={(props) => <CashBoxCard {...props} type={'edit'}/>}/>
                        </Switch>}
                    />
                    <Route path='/nodes' render={() =>
                        <Switch>
                            <Route exact path='/nodes'
                                   render={() => <Nodes path={'/nodes'}/>}/>
                            <Route path='/nodes/add'
                                   render={(props) => <NodeCard {...props} type={'add'}/>}/>
                            <Route path='/nodes/edit/:id'
                                   render={(props) => <NodeCard {...props} type={'edit'}/>}/>
                        </Switch>}
                    />

                    <Route path='/roles' render={() =>
                        <Switch>
                            <Route exact path='/roles/add'
                                   render={(props) => <RoleCard {...props} type={'add'}/>}/>
                            <Route path='/roles/edit/:id'
                                   render={(props) => <RoleCard {...props} type={'edit'}/>}/>
                        </Switch>}
                    />
                    <Route path='/marking' render={() =>
                        <Switch>
                            <Route exact path='/marking'
                                   render={(props) => <MarkingCard {...props} type={'add'}/>}/>
                            <Route path='/marking/edit/:id'
                                   render={(props) => <MarkingCard {...props} type={'edit'}/>}/>
                        </Switch>}
                    />
                    <Route exact path='/company-details' render={() => <CompanyDetails/>}/>
                    <main>
                        {this.props.modalWindowSettings && this.props.modalWindowSettings.isOpen &&
                        <Modal toggleWindow={this.toggleModal} data={this.props.modalWindowSettings.data}/>}
                    </main>
                </section>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        modalWindowSettings: state.modalWindowSettings
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleModalWindow: (value) => {
            dispatch(toggleModalWindow(value))
        }
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
