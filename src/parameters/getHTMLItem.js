import * as $ from "jquery";

import {printParameter} from "./printParameter";

export function getItem(parameter) {
    switch (parameter.name) {
        case ("couleur"): //color
            requestParameter(parameter, handleColorsResponse);
            break;
        case ("nature de l'élément"): //instance of
            requestParameter(parameter, handleInstanceOfResponse);
            break;
        case ("partie de"): //part of
            requestParameter(parameter, handlePartOfResponse);
            break;
        default:
            requestParameter(parameter, handleDefaultItem);
            break;
    }
}

function requestParameter(parameter, handleResponseFunction) {
    $.get("api/getParameterValues", {
        reference: parameter.reference
    }, (response) => {
        if (response.error) {
            console.error(error);
        } else {
            handleResponseFunction(parameter, response.data);
        }
    });
}

function handleColorsResponse(parameter, colors){
    printParameter(parameter, getColorsHTML, colors);
}

function handleInstanceOfResponse(parameter, instances){
    //Isolate type and print them separetly
    const types = instances.filter(i => i.name.startsWith("Pokémon de type "));
    const typeParameter = Object.assign({}, parameter);
    typeParameter.name = "type";
    typeParameter.collapse = true;
    printParameter(typeParameter, getTypesHTML, types);

    //Print others
    const others = instances.filter(i => !i.name.startsWith("Pokémon de type "));
    printParameter(parameter, getDefaultItems, others);
}

function handlePartOfResponse(parameter, parts){
    //Isolate type and print them separetly
    const gens = parts.filter(i => i.name.endsWith("génération"));
    const genParameter = Object.assign({}, parameter);
    genParameter.name = "génération";
    printParameter(genParameter, getDefaultItems, gens);

    //Print others
    const others = parts.filter(i => !i.name.endsWith("génération"));
    printParameter(parameter, getDefaultItems, others);
}

function handleDefaultItem(parameter, values) {
    printParameter(parameter, getDefaultItems, values);
}


function getColorsHTML(colors) {
    return `<div class="mt-2"> ${colors.reduce((acc, color) => acc += getColorHTML(color), "")} </div>`;
}

function getColorHTML(color) {
    return `
        <div class="form-check form-check-inline">
            <label for="pokemon-${color.name}" class="btn x${color.name} rounded-button btn-badge-text">
                <input type="checkbox" name="checkbox-couleur" id="pokemon-${color.name}" class="badgebox" value="${color.reference}">
                <span class="badge-circle badge text-white">
                    <i class="fa fa-check"></i>
                </span>
            </label>
            <span class="badge badge-count badge-danger">${color.count}</span>
        </div>
    `;
}

function getTypesHTML(types) {
    return `<div class="mt-2"> ${types.reduce((acc, type) => acc += getTypeHTML(type), "")} </div>`;
}

function getTypeHTML(type) {

    let typeName = type.name.substring(16);
    let typeNoAccent = removeAccent(typeName);

    return `
    <div>
        <label for="pokemon-type-${typeNoAccent}" class="btn btn-sm text-white rounded-pill btn-badge-text type-${typeNoAccent}">${typeName} 
            <input type="checkbox" name="checkbox-type" id="pokemon-type-${typeNoAccent}" value="${type.reference}" class="badgebox">
            <span class="badge badge-white text-primary">
                <i class="fa fa-check"></i>
            </span>     
        </label>
        <span class="badge badge-count badge-danger">${type.count}</span>
    </div>
    `;
}

function removeAccent(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getDefaultItems(gens) {
    return `
            <select data-width="279px" class="selectpicker" multiple>
            ${gens.reduce((acc, gen) => acc += getDefaultItem(gen), "")}
            </select>
        </div>
    `;
    
}

function getDefaultItem(gen) {
    return `
        <option data-content="${truncateString(gen.name,25)}<span class='ml-1 badge badge-danger'>${gen.count}</span>" value="${gen.reference}"></option>
    `;
}

function truncateString(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '<br/>' +  truncateString(str.slice(num, str.length), num);
  }
  