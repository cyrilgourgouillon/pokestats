import * as $ from "jquery";
require("bootstrap");

//Handle sidebar toggle
require("./sideToggle");

/**
 * Get all the pokemons parameters
 */
$.get("api/getParameters",  (response) => {
    if(response.error){
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

const parametersType = {
    ITEM : "http://wikiba.se/ontology#WikibaseItem",
    STRING: "http://wikiba.se/ontology#String",
    QUANTITY: "http://wikiba.se/ontology#Quantity",
}

function printParam( param) {
    switch(param.type) {
        case(parametersType.ITEM) : 
            printItem(param); break;
        case(parametersType.STRING) : 
            printString(param); break;
        case(parametersType.QUANTITY) : 
            printQuantity(param); break;
        default: 
            console.error("Unknown type"); break;
    }
}


function printItem(param) {
    console.log("printItem", param.name, param.reference);
    switch(param.name) {
        case("couleur"):
            printColor(param); break;
        case("nature de l'élément"):
            //printInstanceOf(param); 
            break;
        case("partie de"):
            //printPartOf(param); 
            break;
        default : 
            printDefaultItem(param);
    }
}

function printColor(parameter) {
    $.get("api/getParameterValues", {
        reference : parameter.reference
    }, (response) => {
        if(response.error){
            //Print the error
            console.error(error);
        } else {
            console.log(response.data);
        }
    });
}

function printString(param) {
    console.log("printString", param.name);
}

function printQuantity(param) {
    console.log("printQuantity", param.name);

    $("#parameters-form").append(`
        <div class="form-group">
            <label for="Label">${param.name}</label>
            <span class="badge badge-danger">${param.count}</span>
            <input type="number" name="${param.name}" class="form-control" id="Label">
        </div>
    `);
}

function printDefaultItem(param) {
    console.log("printDefaultItem", param.name);
}