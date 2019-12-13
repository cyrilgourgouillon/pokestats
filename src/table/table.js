import {Grid, }  from "ag-grid-community";

let grid;
let parameters;
const typeQUANTITY = "http://wikiba.se/ontology#Quantity";

export function stockParams(params){
    parameters = params;
}

export function update(pokeData) {
    if(grid){
        grid.destroy();
    }
    

    //Split nature de et partie de pour avoir les types et les generations à part
    const pokemons = splitParams(pokeData);

    //Get the header olumn def
    const columns = getColumn(pokemons);
    //Pokmons object to displayable rows
    const rows = pokemonsToRow(pokemons);

    const gridOptions = {
        defaultColDef: {
            resizable: true,
            sortable: true
        },
        columnDefs: columns,
        rowData: rows,
        onGridReady: () => {
            gridOptions.api.sizeColumnsToFit();
        }, components: {
            'pokemonIconRenderer': pokemonIconRenderer
        }
    };

    
    const eGridDiv = document.querySelector('#pokemons-table');
    grid = new Grid(eGridDiv, gridOptions);

    window.onresize = () => {
        gridOptions.api.sizeColumnsToFit();
    }
}

function getColumn(pokemons) {
    return [{
        headerName: "#",
        cellRenderer: 'pokemonIconRenderer',
        sortable: false
    },{
        headerName: "Nom",
        field: "Nom"
    }].concat(pokemons[0].values.map(value => {
        return {
            headerName: value.name, 
            field: value.name
        }
    }));
}


function pokemonsToRow(pokemons) {
    return pokemons.map(pokemon => {
        const obj = {"Nom": pokemon.name};
        pokemon.values.forEach((value) => {
            const name = value.name;
            if(value.vals.length > 1) {
                obj[name]= value.vals.join(",");
            } else {
                obj[name]= value.vals[0];
            }
        })
        return obj;
    });
}

function splitParams(poke) {
    const pokemons = [...poke];
    pokemons.forEach(pokemon => {
        pokemon.values.forEach(parameter => {
            switch(parameter.name) {
                case "nature de l'élément":
                    splitNature(pokemon, parameter);
                    break;
                case "partie de":
                    splitPartie(pokemon, parameter);
                    break;
            };
            if(parameters.filter(p => p.type === typeQUANTITY).some(p => p.name === parameter.name)) {
                convertInt(parameter);
            }
        });
    });
    return pokemons;
}

function splitNature(pokemon, parameter) {
     //Isolate type 
     pokemon.values.push(
         {
             name: "type",
             vals: parameter.vals.filter(i => i.startsWith("Pokémon de type "))
         }
     );
     parameter.vals = parameter.vals.filter(i => !i.startsWith("Pokémon de type "));
}

function splitPartie(pokemon, parameter) {
    //Isolate type 
    pokemon.values.push(
        {
            name: "génération",
            vals: parameter.vals.filter(i => i.endsWith("génération"))
        }
    );
    parameter.vals = parameter.vals.filter(i => !i.endsWith("génération"));
}

function convertInt(parameter) {
    //Corect a bug with double values
    if(parameter.vals.length > 1 ){
        parameter.vals = [parameter.vals[1]];
    }
    parameter.vals = parameter.vals.map(val => {
        const int = parseInt(val);
        return (isNaN(int)) ? null : int;
    });
}

class pokemonIconRenderer {
    init(params) {
        this.eGui = document.createElement("img");
        this.eGui.width = "50";
        if(params.data["numéro dans le navigateur Pokémon"]) {
            const pokedex = parseInt(params.data["numéro dans le navigateur Pokémon"]);
            if(!isNaN(pokedex)) {
                this.eGui.setAttribute("onerror", "this.onerror=null;this.src='./images/inttero.png';");
                this.eGui.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedex}.png`;
            } else {
                this.eGui.src = `./images/inttero.png`;
            }
        } else {
            this.eGui.src = `./images/inttero.png`;
        }
    }
    getGui() {
        return this.eGui;
    }
}

