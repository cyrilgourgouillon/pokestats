import * as $ from "jquery";
import {EventEmitter} from "events";

//import { lookup } from "dns";
require("bootstrap");
require("bootstrap-select");

//Import different print Sections
import {getItem} from "./getHTMLItem";
import {getQuantity} from "./getHTMLQuantity";
import {getString} from "./getHTMLstring";

//print parameter
import {printParameter} from "./printParameter";

//Import on submit parameters form 
const submit = require("./submitParameters");

//Create event to target the table when we gets pokemons
export const event = new EventEmitter();

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
        console.error(response.error);
    } else {
        handleParameters(response.data);
    }
});


function handleParameters(parameters) {
    event.emit("getParameters", parameters);
    printParameters(parameters);
}

function printParameters(parameters) {
    $("#dynamic-parameters-form").empty();
    parameters.forEach(param => {
        printParam(param);
    });
}

function printParam(param) {
    switch (param.type) {
        case (parametersType.ITEM):
            getItem(param);
            break;
        case (parametersType.STRING):
            printParameter(param, getString);
            break;
        case (parametersType.QUANTITY):
            printParameter(param, getQuantity);
            break;
        default:
            console.error("Unknown type");
            break;
    }
}

submit.event.on("response", (data) => {
    event.emit("getPokemons", data);
});