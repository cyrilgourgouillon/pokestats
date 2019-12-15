import {Grid}  from "ag-grid-community";

let grid;
let gridOptions;

const eGridDiv = document.querySelector('#pokemons-table');
grid = new Grid(eGridDiv, {overlayLoadingTemplate: '<span class="ag-overlay-loading-center">En attente de la séléctions des critères</span>',});


export function stockParams(params){
    parameters = params;
}

export function update(pokemons) {
    if(grid){
        grid.destroy();
    }
    
    //Get the header olumn def
    const columns = getColumn(pokemons);
    //Pokmons object to displayable rows
    const rows = pokemonsToRow(pokemons);

    gridOptions = {
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

    
    
    grid = new Grid(eGridDiv, gridOptions);
 
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


window.onresize = () => {
    resizeTable();
}

export function resizeTable() {
    console.log("ok");
    if(gridOptions) {
        gridOptions.api.sizeColumnsToFit();
    }
}