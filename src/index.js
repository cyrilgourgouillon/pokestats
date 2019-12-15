import {splitParams} from "./split"

let parameters;

//Handle sidebar toggle
const sideToggle = require("./sideToggle");

sideToggle.event.on("toggled", () => {
    table.resizeTable();
});


//Side bar paramaters print and get pokemons
const param = require("./parameters/parameters");

param.event.on("getPokemons", (pokeData) => {
    const pokemons = splitParams(pokeData, parameters);
    table.update(pokemons);
    graph.update(pokemons, parameters);
})

param.event.on("getParameters", (params) => {
    parameters = params;
});

//Print pokemon to table
const table = require("./table/table");

//Print pokemon to table
const graph = require("./graph/graph");



