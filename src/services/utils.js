import React from 'react';
import md5 from '../../node_modules/js-md5/build/md5.min';
import {BASE_URL} from "./constants";
import TextAreaForm from "../components/TextAreaForm/TextAreaForm";
import SelectMenu from "../components/SelectMenu/SelectMenu";
import Input from "../components/Input/Input";
import Headline from "../components/Headline/Headline";
import FullList from "../components/List/FullList";
import Toggle from "../components/Toggle/Toggle";
import FullComponentForList from "../components/List/FullComponentForList";
import Button from "../components/Button/Button";
import InputPlusButton from "../components/InputPlusButton/InputPlusButton";
import ModalList from "../components/List/ModalList";

export let postRequest = (url, request, cb, showMessage) => {
    let promise = new Promise((resolve, reject) => {
        fetch(BASE_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: request
        })
            .then(result => {
                if (result.status === 200) {
                    return result.json();
                } else {
                    if (showMessage) {
                        let param = {
                            message: "Статус запроса: " + result.status,
                            type: "error"
                        };
                        showMessage(param);
                    }

                }
            })

            .then(response => {
                if (cb) {
                    cb(response)
                } else {
                    resolve(response)
                }
            })
            .catch(error => reject(error))

    });
    return promise;
};

export let getRequest = (url) => {
    let promise = new Promise((resolve, reject) => {
        fetch(BASE_URL + url, {
            method: "GET"
        })
            .then(result => {
                if (result.status !== 200) {

                }
                return result.json();
            })
            .then(response => resolve(response))
            .catch(err => alert(err))
    });
    return promise;
};
// export let postRequest = (url, request) => {
//     let promise = new Promise((resolve, reject) => {
//         fetch(BASE_URL + url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: request,
//         })
//             .then(result => result.json())
//             .then(response => {
//                 resolve(response)
//             })
//     });
//     return promise;
// };

// export let getRequest = (url) => {
//     let promise = new Promise((resolve, reject) => {
//         fetch(BASE_URL + url)
//             .then(result => result.json())
//             .then(response => resolve(response))
//     });
//     return promise;
// };

// export let postRequest = (url, obj) => {
//     return fetch(BASE_URL + url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: obj,
//     })
// };
//
// export let getRequest = (url) => {
//     return fetch(BASE_URL + url)
// };

export let mapUserList = (userList) => {
    return userList.map((user) => {
        return {
            ...user,
            name: user.lastName + " " + user.firstName + " " + user.secondName
        }
    })
};

export let MapDataToFormElementsService = {
    elementTypeList: {
        headline: function (item) {
            return <Headline key={item.id} data={item}/>
        },
        button: function (item) {
            return <Button key={item.id} data={item}/>
        },
        select: function (item, responseData) {
            return item.optionListName && responseData && responseData[item.optionListName] && responseData[item.optionListName].length ?
                <SelectMenu key={item.id} data={item} responseData={responseData}
                            values={responseData[item.responseDataName]}/> : null
        },
        input: function (item, responseData) {
            return responseData && item.responseDataName ?
                <Input key={item.id} data={item} values={responseData[item.responseDataName]}/> : null
        },
        list: function (item, responseData) {
            let fullListFieldName = item.fullListFieldName;
            return fullListFieldName && responseData && responseData[fullListFieldName] && responseData[fullListFieldName].length ?
                <FullList key={item.id} data={item} responseData={responseData[fullListFieldName]}/> : null;
        },
        fullListComponent: function (item, responseData) {
            let fullListFieldName = item.fullListFieldName,
                selectedListFieldName = item.selectedListFieldName;
            return fullListFieldName && responseData && responseData[fullListFieldName] && responseData[fullListFieldName].length
            && responseData[selectedListFieldName] ? <FullComponentForList key={item.id} data={item}
                                                                           uniqueKey={item.responseDataName + '_' + item.name}
                                                                           responseData={responseData}/> : null
        },
        textarea: function (item, responseData) {
            return <TextAreaForm key={item.id} data={item} values={responseData[item.responseDataName]}
                                 responseData={responseData}/>
        },
        toggle: function (item, responseData) {
            return <Toggle key={item.id} data={item} responseData={responseData}
                           uniqueKey={item.responseDataName + '_' + item.name}
                           values={responseData[item.responseDataName]}/>
        },
        inputButton: function (item, responseData) {
            return responseData && item.responseDataName ?
                <InputPlusButton key={item.id} data={item} values={responseData[item.responseDataName]}/> : null
        },
        modalList: function (item, responseData) {
            return responseData ?
                <ModalList key={item.id} data={item} responseData={responseData} onSelect={item.onSelect} onSelectId={item.onSelectId}/> : null;
        }
    },
    getElementFormService: function (cardFields, responseData) {
        return cardFields && cardFields.map((item) => this.elementTypeList[item.element](item, responseData));
    }
};


export let pagination = {
    "pagination": {
        "pageNo": 0,
        "pageSize": 100
    }
};

let mapFullListComponentItems = (fullList, selectedList) => {
    return selectedList.map(selectedItem => fullList.filter((fullListItem) => selectedItem === fullListItem.id)[0]);
};

export let getFullListComponentList = (fullList, responseDataItem, selectedListFieldName) => {
    return responseDataItem[selectedListFieldName] && fullList.length ?
        (responseDataItem[selectedListFieldName].length ? mapFullListComponentItems(fullList, responseDataItem[selectedListFieldName]) : [])
        : null;
};

export let createRequestBody = (settings, fullListUniqKey, isEditPage) => {

    let requestBody = {};
    let inputFields = document.querySelectorAll("input:not([type='checkbox'])");
    let textareaField = document.querySelector("textarea");
    let selects = document.querySelectorAll("select");
    let fullListComponent = document.getElementById(fullListUniqKey),
        fullListSelectedItems = fullListComponent && fullListComponent.querySelectorAll('li input[type="checkbox"]');
    settings.forEach((field) => {
        if (isEditPage ? !field.hideOnEditPage : !field.showOnEditPage) {
            switch (field.element) {
                case 'input':
                    inputFields.forEach((input) => {
                            if (field.name === input.name) {
                                requestBody[field.name] = input.type !== "password" ? input.value : md5(input.value)
                            }
                        }
                    );
                    break;
                case 'inputButton':
                    inputFields.forEach((input) => {
                            if (field.name === input.name) {
                                requestBody[field.name] = +input.value
                            }
                        }
                    );
                    break;
                case "select":
                    selects.forEach((select) => {
                            if (field.name === select.name) {
                                requestBody[field.name] = +select.value
                            }
                        }
                    );
                    break;
                case "fullListComponent":
                    if (fullListSelectedItems && fullListSelectedItems.length) {
                        let list = [...fullListSelectedItems];
                        requestBody[field.name] = list.map((listItem) => +listItem.value);
                    } else {
                        requestBody[field.name] = [];
                    }
                    break;
                case "toggle":
                    let value = document.getElementById(field.responseDataName + '_' + field.name)
                        .querySelector("input[type='checkbox']").checked;
                    requestBody[field.name] = field.useObject && field.useObject.value && field.useObject.values ?
                        field.useObject.values[+value] : value;
                    break;
                case "textarea":
                    requestBody[field.name] = textareaField.value;
                    break;
            }
        }
    });
    return requestBody;
};
