import {Chart} from "chart.js";
import * as $ from "jquery";

const parametersType = {
    ITEM: "http://wikiba.se/ontology#WikibaseItem",
    STRING: "http://wikiba.se/ontology#String",
    QUANTITY: "http://wikiba.se/ontology#Quantity",
}

let pokemons;
let parameters;

const ctx =  document.getElementById("myChart");

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Aucune donnée',
            data: [],
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

export function update(pokes, params) {
    pokemons = pokes;
    parameters = params;
    updateSelect(pokemons, parameters)
}

function updateSelect(pokemons, parameters) {

    if(pokemons.length === 0) {
        return;
    }


    const labels = ["Sélectionner...","nom"].concat(pokemons[0].values.map(value => value.name));
    const data = ["Sélectionner..."].concat(pokemons[0].values.reduce((acc, value) => {
        if(parameters.filter(p => p.type === parametersType.QUANTITY).some(p => p.name === value.name)) {
            acc.push(value.name);
        }
        return acc;
    }, [])).concat(["#nombre"]);
  

    const optionsLabels = labels.reduce((acc, name) => acc+=`<option value="${name}">${name}</option>`, "");
    const optionsData = data.reduce((acc, name) => acc+=`<option value="${name}">${name}</option>`, "");

    $("#graphe-x").html(optionsLabels);
    $("#graphe-y").html(optionsData);
}

$("#afficher-graph").click(() => {
    const x = $("#graphe-x").val();
    const y = $("#graphe-y").val();
    if(x !== "Sélectionner..." && y !== "Sélectionner...") {

        //Add nom values if selected
        if(x==="nom"){
            pokemons.forEach(p => p.values.push({name: "nom", vals: [p.name]}));
        }
     
        let labels = [];
        let data = [];

        //cas elem unque (string ou quantity)
        if(x === "nom" || parameters.filter(p => ((p.type === parametersType.STRING) || (p.type ===  parametersType.QUANTITY))).some(p => p.name === x))  {
            pokemons.forEach(p => {
                const xVals = p.values.find(value => value.name === x).vals;
                let yVals;
                if(y !== "#nombre"){
                    yVals = p.values.find(value => value.name === y).vals;
                }
                if(xVals.length > 0 && xVals[0] !== null  && (yVals !== undefined && yVals.length > 0 && yVals[0] !== null)) {
                    labels.push(xVals);
                    data.push(yVals[0]);
                } else if (xVals.length > 0 && xVals[0] !== null  ) {
                    labels.push(xVals);
                    data.push(1);
                }
            });
        } 

        //cas item
        if(x === "type" ||  x === "génération" || parameters.filter(p => p.type === parametersType.ITEM).some(p => p.name === x)){
            if(y === "#nombre") {
                pokemons.forEach(p => {
                    const xVals = p.values.find(value => value.name === x).vals;
                    if(xVals.length > 0 && xVals[0] !== null ) {
                        labels.push(xVals[0]);
                    } 
                });
                const readed = [];
                labels.forEach(val => {
                    if(readed.indexOf(val) === -1) {
                        readed.push(val);
                        data.push(labels.reduce((acc, label) => {
                            if(label === val) {
                                acc ++;
                            }
                            return acc;
                        } , 0));
                    }
                });
                labels = readed;
            } else {
                pokemons.forEach(p => {
                    const xVals = p.values.find(value => value.name === x).vals;
                    const yVals = p.values.find(value => value.name === y).vals;
                    if(xVals.length > 0  && xVals[0] !== null  && yVals.length > 0 && yVals[0] !== null) {
                        labels.push(xVals[0]);
                        data.push(yVals[0]);
                    } 
                });

                console.log(Object.assign({},labels), Object.assign({},data));

                const readed = [];
                const readedData = [];
                labels.forEach(val => {
                    if(readed.indexOf(val) === -1) {
                        let nb = 0;
                        readed.push(val);
                        const sum = labels.reduce((acc, label, index) => {
                            if(label === val) {
                                nb++;
                                acc += data[index];
                            }
                            return acc;
                        } , 0);
                        readedData.push(sum/nb);
                        data.push();
                    }
                });
                labels = readed;
                data = readedData;
            }
        }

        myChart.data.labels = labels;
        myChart.data.datasets = [{
            label: y,
            data: data,
            borderWidth: 1
        }];

        myChart.update();
    }
});


