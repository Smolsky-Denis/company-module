import React from 'react';
import '../../../node_modules/jquery/dist/jquery'
import './OcrCmUser.module.css'
import AdminFunctions from "../../components/AdminFunctions/AdminFunctions";
import docs from '../../img/docs.png';
import employee from '../../img/employee.png';
import node from '../../img/node.png';
import cashbox from '../../img/cashbox.png';
import role from '../../img/role.png';
import audit from '../../img/audit.png';
import mark from '../../img/mark.png';
import companyDetails from '../../img/companyDetails.png';
const OcrCmUser = (props) => {
    let data = {
        adminFunctions: [
            {
                id: 0,
                value: 'Администрирование Касс',
                path: '/administration-of-cash-registers',
                imgUrl: cashbox,
                alt: 'cashbox'
            }, {
                id: 1,
                value: 'Администрирование Маркировки',
                path: '/marking',
                imgUrl: mark,
                alt: 'mark'
            }, {
                id: 2,
                value: 'Сотрудники',
                path: '/employee-administration',
                imgUrl: employee,
                alt: 'employees'
            }, {
                id: 3,
                value: 'Роли',
                path: '/roles/add',
                imgUrl: role,
                alt: 'roles'
            },{
                id: 4,
                value: 'Торговые точки / Склады',
                path: '/nodes',
                imgUrl: node,
                alt: 'nodes'
            },{
                id: 5,
                value: 'Аудит',
                path: '/audit',
                imgUrl: audit,
                alt: 'audit'
            },{
                id: 6,
                value: 'Сведения о компании',
                path: '/company-details',
                imgUrl: companyDetails,
                alt: 'audit'
            },{
                id: 7,
                value: 'Справочная документация',
                path: '/reference-documentation',
                imgUrl: docs,
                alt: 'reference documentation'
            }
        ]
    };
    let result = data.adminFunctions.map((item) => <AdminFunctions key={item.id} data={item}/>);

    return (
        <div className='col-lg-2 col-md-4 border-right'>
            {result}
        </div>
    )
};

export default OcrCmUser;
