import {combineReducers} from "redux";
import UserInfoReducer from '../components/NavBar/reduсer/userInfoReducer';
import EmployeesInfoReducer from "../pages/Employee/EmployeeAdministration/reducer/EmployeesReducer";
import CashRegisterInfoReducer from "../pages/CashBox/AdministrationOfCashRegisters/reducer/CashRegistersReducer";
import ModalWindowReducer from "../components/Modal/reducer/modalReducer";
import EmployeeCardInfoReducer from "../pages/Employee/EmployeeCard/reducer/EmployeeCardReducer";
import CashBoxCardInfoReducer from "../pages/CashBox/CashBoxCard/reducer/CashBoxReducer";
import NodeCardInfoReducer from "../pages/NodeCard/reducer/NodeCardReducer";
import RoleCardInfoReducer from "../pages/RoleCard/reducer/RoleCardReducer";
import ToggleInfoReducer from "../components/Toggle/toggleReducer";
import OcrCmInfoReducer from "../pages/OcrCmUser/OcrCmUserReducer";
import CompanyDetailsInfoReducer from "../pages/CompanyDetails/CompanyDetailsReducer";
import MarkingCardInfoReducer from "../pages/MarkingCard/MarkingCardReducer";
import ATEInfoReducer from "../pages/ATE/ATEReducer";

export default combineReducers({
    ...UserInfoReducer,
    ...EmployeesInfoReducer,
    ...CashRegisterInfoReducer,
    ...ModalWindowReducer,
    ...EmployeeCardInfoReducer,
    ...CashBoxCardInfoReducer,
    ...NodeCardInfoReducer,
    ...RoleCardInfoReducer,
    ...NodeCardInfoReducer,
    ...ToggleInfoReducer,
    ...OcrCmInfoReducer,
    ...CompanyDetailsInfoReducer,
    ...MarkingCardInfoReducer,
    ...ATEInfoReducer
});
