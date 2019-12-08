using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using VDS.RDF.Nodes;
using VDS.RDF.Query;

namespace Pokestats.Models {
    public class GetPokemons {

        static class Types {
                public const string item ="http://wikiba.se/ontology#WikibaseItem";
                public const string str ="http://wikiba.se/ontology#String";
                public const string quantity ="http://wikiba.se/ontology#Quantity";     
        }
            
        public static List<Pokemon> request(List<Filter> filters) {

            Console.WriteLine("hhlljnbljbl " + filters);

            IEnumerable<string> names = filters.Select(filter => filter.name);

            string request = @"
                SELECT DISTINCT ?pokemonLabel " + getNames(filters) + @" WHERE {
                    #Sélection des pokémons
                    ?pokemon wdt:P31/wdt:P279* wd:Q3966183.
                    
                    #Filtrage sur les wikidataitem
                    " +  filterWdtItems(filters) + @"
                    
                    #Affichage des caractéristiques
                    " +  optionalCaracs(filters) + @"
                    
                    #Filtrage de la hauteur
                    " +  filterQuantity(filters) + @"
                    
                    #Filtrage du numéro
                    " +  filterString(filters) + @"
                    
                    SERVICE wikibase:label { bd:serviceParam wikibase:language 'fr, en'. }
                } ORDER BY ?pokemonLabel
            ";

            Console.WriteLine(request);

            SparqlResultSet results = Request.make(request);
            
            return resultsToObject(results, names);
        }

        public static string getNames(List<Filter> filters) {
            return string.Join(" ",filters.Select(filter => "?" + Utils.normalizeName(filter.name) + "Label"));
        }

        

        public static string filterWdtItems(List<Filter> filters) {
            return  filters.Aggregate(new StringBuilder(), (acc, filter) => {
                if(filter.type == Types.item && filter.values.Count != 0){
                    acc.AppendLine(getValuesPart(filter));
                    acc.AppendLine("?pokemon " + Utils.getObjectWithUrl("wdt",filter.reference) + " ?" + Utils.normalizeName(filter.name) + ".");
                }
                return acc;
            }).ToString();
        }

        public static string getValuesPart(Filter filter) {
            return "VALUES ?" + 
                    Utils.normalizeName(filter.name) + 
                    " {" +
                    string.Join(" ", 
                        filter.values.Select(val => Utils.getObjectWithUrl("wd", val))
                    ) + 
                    " }";
        }

        public static string optionalCaracs(List<Filter> filters) {
             return filters.Aggregate(new StringBuilder(), (acc, filter) => {
                acc.AppendLine("OPTIONAL { ?pokemon " + Utils.getObjectWithUrl("wdt",filter.reference) + " ?" + Utils.normalizeName(filter.name) + ". }");
                return acc;
            }).ToString();
        }

        public static string filterQuantity(List<Filter> filters) {
            return filters.Aggregate(new StringBuilder(), (acc, filter) => {
                if(filter.type == Types.quantity) {
                    if(filter.values.Count == 2){
                        string name = Utils.normalizeName(filter.name);
                        acc.AppendLine("FILTER(?" + name + " > " + filter.values[0] + " && ?" + name + " < " + filter.values[1] + ")");
                    } else {
                        throw new ArgumentException("Type quantity must have 2 arguments (min & max)");
                    }
                }
                return acc;
            }).ToString();
        }

        public static string filterString(List<Filter> filters) {
            return filters.Aggregate(new StringBuilder(), (acc, filter) => {
                if(filter.type == Types.str) {
                        string name = Utils.normalizeName(filter.name);
                        acc.AppendLine("FILTER(" + string.Join(" || ", filter.values.Select(val => {
                            return "?" + Utils.normalizeName(filter.name) + " = " + "'" + val + "'";
                        })) + ")");
                }
                return acc;
            }).ToString();
        }

        public static List<Pokemon> resultsToObject(SparqlResultSet results, IEnumerable<string> names) {
            List<Pokemon> pokemons =  new List<Pokemon>();
            results.Results.ForEach( row => {
                string pkName = row.ElementAt(0).Value.AsValuedNode().AsString();
                if(!pokemons.Exists(pk => pk.name == pkName)){
                    Pokemon pokemon = new Pokemon(pkName, new List<Values>());
                    pokemons.Add(pokemon);
                }
                for(int i = 1; i < row.Count; i++) {
                    Pokemon pokemon = pokemons.Find(pk => pk.name == pkName);
                    string valName = names.ElementAt(i-1);
                    if(!pokemon.values.Exists(val => val.name == valName)){
                        pokemon.values.Add(new Values(names.ElementAt(i-1), new List<string>()));
                    }
                    Values values = pokemon.values.Find(val => val.name == valName);
                    IValuedNode value = row.ElementAt(i).Value.AsValuedNode();
                    string val = (value != null) ? row.ElementAt(i).Value.AsValuedNode().AsString() : "";
                    if(!values.vals.Exists(v => v == val)){
                        values.vals.Add(val);
                    }
                }
            });
            return pokemons;
        }
    }
}

