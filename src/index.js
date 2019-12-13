//Handle sidebar toggle
require("./sideToggle");

//Side bar paramaters print and get pokemons
const param = require("./parameters/parameters");

param.event.on("getPokemons", (pokemons) => {
    table.update(pokemons);
})

param.event.on("getParameters", (parameters) => {
    table.stockParams(parameters);
});

//Print pokemon to table
const table = require("./table/table");



