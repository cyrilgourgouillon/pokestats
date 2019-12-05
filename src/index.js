import * as $ from "jquery";
//import { lookup } from "dns";
require("bootstrap");
require("bootstrap-select");

//Handle sidebar toggle
require("./sideToggle");

const parametersType = {
    ITEM: "http://wikiba.se/ontology#WikibaseItem",
    STRING: "http://wikiba.se/ontology#String",
    QUANTITY: "http://wikiba.se/ontology#Quantity",
}

/**
 * Get all the pokemons parameters
 */
$.get("api/getParameters", (response) => {
    if (response.error) {
        //Print the error
        console.error(error);
    } else {
        handleParameters(response.data);
    }
});


function handleParameters(parameters) {
    printParameters(parameters);
}

function printParameters(parameters) {
    $("#parameters-form").empty();
    parameters.forEach(param => {
        printParam(param);
    })
}

function printParam(param) {
    switch (param.type) {
        case (parametersType.ITEM):
            printItem(param);
            break;
        case (parametersType.STRING):
            printString(param);
            break;
        case (parametersType.QUANTITY):
            printQuantity(param);
            break;
        default:
            console.error("Unknown type");
            break;
    }
}


function printItem(param) {
    console.log("printItem", param.name, param.reference);
    switch (param.name) {
        case ("couleur"): //color
            printColor(param);
            break;
        case ("nature de l'élément"): //instance of
            printInstanceOf(param);
            break;
        case ("partie de"): //part of
            printPartOf(param);
            break;
        default:
            printDefaultItem(param);
    }
}

function printColor(parameter) {
    $.get("api/getParameterValues", {
        reference: parameter.reference
    }, (response) => {
        if (response.error) {
            //Print the error
            console.error(error);
        } else {
            $("#parameters-form").append(`
                <div class="form-group">
                    <label class="form-check-label mb-2">Couleur(s)</label>
                    <button class="btn btn-secondary btn-sm" type="button" data-toggle="collapse" data-target="#collapseColor" aria-expanded="false" aria-controls="collapseColor">
                        <i class="fas fa-angle-down"></i>
                    </button>
                    <div class="form-check collapse pt-1" id="collapseColor">
                        ${getColorsHTML(response.data)}
                    </div>
                </div>
            `);
        }
    });
}

function getColorsHTML(colors) {
    return colors.reduce((acc, color) => acc += getColorHTML(color), "");
}

function getColorHTML(color) {
    return `
        <div class="form-check form-check-inline">
            <label for="pokemon-${color.name}" class="btn x${color.name} rounded-button btn-badge-text">
                <input type="checkbox" id="pokemon-${color.name}" class="badgebox" value="${color.name}">
                <span class="badge-circle badge text-white">
                    <i class="fa fa-check"></i>
                </span>
            </label>
            <span class="badge badge-count badge-danger">${color.count}</span>
        </div>
    `;
}

function printInstanceOf(parameter) {
    $.get("api/getParameterValues", {
        reference: parameter.reference
    }, (response) => {
        if (response.error) {
            //Print the error
            console.error(error);
        } else {
            checkInstanceOf(response.data);
        }
    });
}

function checkInstanceOf(instance) {

    let allTypes;

    allTypes = instance.filter(i => i.name.startsWith("Pokémon de type "));

    printType(allTypes);

}

function printType(allTypes) {

    $("#parameters-form").append(`
    <div class="form-group">
        
            <label class="form-check-label mb-2">Type(s)</label>
            <button class="btn btn-secondary btn-sm" type="button" data-toggle="collapse" data-target="#collapseType" aria-expanded="false" aria-controls="collapseType">
                <i class="fas fa-angle-down"></i>
            </button>
            <div class="form-check collapse pt-1" id="collapseType">
                ${getTypesHTML(allTypes)}
            </div>
        
    </div>`);
}

function getTypesHTML(types) {
    return types.reduce((acc, type) => acc += getTypeHTML(type), "");
}

function getTypeHTML(type) {

    let typeName = type.name.substring(16);

    let typeNoAccent = removeAccent(typeName);

    return `
    <div>
        <label for="pokemon-type-${typeNoAccent}" class="btn btn-sm text-white rounded-pill btn-badge-text type-${typeNoAccent}">${typeName} 
            <input type="checkbox" id="pokemon-type-${typeNoAccent}" value="${typeNoAccent}" class="badgebox">
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

function printPartOf(parameter) {
    $.get("api/getParameterValues", {
        reference: parameter.reference
    }, (response) => {
        if (response.error) {
            //Print the error
            console.error(error);
        } else {
            checkPartOf(response.data);
        }
    });
}

function checkPartOf(part)  {
    let allGens;

    allGens = part.filter(i => i.name.endsWith("génération"));

    printGen(allGens);
}

function printGen(allGens) {
    $("#parameters-form").append(`
        <div class="form-group">
            <label class="form-check-label mb-2">Génération</label>
            <select class="selectpicker">
                ${getGensHTML(allGens)}
            </select>
        </div>
    `);
}

function getGensHTML(gens) {
    return gens.reduce((acc, gen) => acc += getGenHTML(gen), "");
}

function getGenHTML(gen) {
    return `
        <option value="">${gen.name}</option>
        <span class="badge badge-count badge-danger">${gen.count}</span>
    `;
}


function printString(param) {
    //console.log("printString", param.name);
    $("#parameters-form").append(`
        <div class="form-group">
            <label for="Label">${param.name}</label>
            <span class="badge badge-danger">${param.count}</span>
            <input type="text" name="${param.name}" class="form-control" id="${param.name}">                
        </div>
    `);
}

function printQuantity(param) {
    console.log("printQuantity", param.name);

    $("#parameters-form").append(`
        <div class="form-group">
            <label for="Label">${param.name}</label>
            <span class="badge badge-danger">${param.count}</span>
            <div class="form-row">
                <div class="col">
                    <input type="number" name="${param.name}" class="form-control" id="${param.name}" placeholder="min">
                </div>
                <div class="col">
                    <input type="number" name="${param.name}" class="form-control" id="${param.name}" placeholder="max">
                </div>
            </div>
        </div>
    `);
}

function printDefaultItem(param) {
    console.log("printDefaultItem", param.name);
}