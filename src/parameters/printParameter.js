import * as $ from "jquery";

export function printParameter(parameter, printFunction, values = null) {

    const isCollapsed = (parameter.collapse === undefined) ? false : parameter.collapse;

    const label = `<label class="form-check-label"> ${capitalizeFirstLetter(parameter.name)}
                        <span class="ml-1 badge badge-danger">${parameter.count}</span>
                   </label>`

    const collapseId = `collapse${removeSpecialCharacters(parameter.name)}`;
    
    const collpaseBtn = `<button class="btn btn-secondary btn-sm" type="button" data-toggle="collapse" data-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}"><i class="fas fa-angle-down"></i></button>`;

    $("#dynamic-parameters-form").append(`
        <div ${parameterToAttributes(parameter)} class="form-group">
            ${label}
            ${(isCollapsed) ? collpaseBtn : ''}
            <div class="${(isCollapsed) ? 'collapse' : ''} pt-1" id="${collapseId}">
                ${(values) ? printFunction(values) : printFunction()}
            </div>
        </div>
    `);
    
    //Update selects after append
    $('.selectpicker').selectpicker();
}

function removeSpecialCharacters(string) {
    return string.replace(/[^\w]/gi, '');
}

function parameterToAttributes(parameter) {
    return Object.entries(parameter).map(([key, value]) => `data-${key}="${value}"`).join(" ");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}