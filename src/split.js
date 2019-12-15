const typeQUANTITY = "http://wikiba.se/ontology#Quantity";

export function splitParams(poke, parameters) {
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
