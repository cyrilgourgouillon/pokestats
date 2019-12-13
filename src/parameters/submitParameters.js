import * as $ from "jquery";
import {EventEmitter} from "events"

export const event = new EventEmitter(); 

const parametersType = {
    ITEM: "http://wikiba.se/ontology#WikibaseItem",
    STRING: "http://wikiba.se/ontology#String",
    QUANTITY: "http://wikiba.se/ontology#Quantity",
}

$("#parameters-form").submit((event) => {
    event.preventDefault();
    getFormParameters();
});

function getFormParameters() {
    const filters = []
    $("#dynamic-parameters-form").children().toArray().forEach((el) => {
        const parameter = {
            "name": $(el).data("name"),
            "reference" : $(el).data("reference"),
            "type": $(el).data("type"),
            "values" : []
        };
        parameter.values =  getValues(el);
        filters.push(parameter);
    });
    deleteDuplicate(filters);
    getPokemons(filters);
}

function getValues(el) {
    const type = $(el).data("type");
    switch(type){
        case parametersType.ITEM:
            return getItemValue(el);
        case parametersType.STRING:
            return  getStringValue(el);
        case parametersType.QUANTITY:
            return getQuantityValue(el);
    }
}

function getItemValue(el) {
    const name = $(el).data("name");
    switch(name){
        case "type":
            return  getTypeValue(el);
        case "couleur":
            return getColorValue(el);
        default:
            return getItemDefaultValue(el);
    }
}

function getColorValue(el) {
    return getCheckboxValue("checkbox-couleur");
}

function getTypeValue(el) {
    return getCheckboxValue("checkbox-type");
}

function getCheckboxValue(name) {
    return $('input[name="'+ name +'"]').toArray().reduce((acc,check) => {
        if($(check).is(":checked")){
            acc.push($(check).val());
        }
        return acc;
    }, []);
}

function getItemDefaultValue(el) {
    return $(el).find("select").val();
}

function getStringValue(el) {
    const string = $(el).find("input").val();
    if(string !== ""){
        return [string];
    }
    return [];
        
}

function getQuantityValue(el) {
    const min = $(el).find('input[name="min"]').val();
    const max = $(el).find('input[name="max"]').val();
    if(min !== "" && max !== ""){
        return [min, max];    
    }
    return [];
}

function deleteDuplicate(filters) {
    filters.forEach((filter, index) => {
        if(filter.name === "type") {
            const nature = filters.find(f => f.name === "nature de l'élément");
            nature.values = nature.values.concat(filter.values);
            filters.splice(index, 1);
        }
        if(filter.name === "génération") {
            const partie = filters.find(f => f.name === "partie de");
            partie.values = partie.values.concat(filter.values);
            filters.splice(index, 1);
        }
    })
}

function getPokemons(filters) {
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: '/api/getPokemons',
        data: JSON.stringify(filters),
        dataType: "json",
        complete: (result) => handleResponse(result.responseJSON)
     });
}

function handleResponse(result) {
    if (result.error === null) {
        event.emit("response", result.data);
    } else {
        console.error(result.error);
    }
}