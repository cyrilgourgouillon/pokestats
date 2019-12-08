using System;
using VDS.RDF.Query;
using System.Linq;
using System.Collections.Generic;
using VDS.RDF.Nodes;

namespace Pokestats.Models {
    public class GetParameterValues {
        public static List<ParameterValue> request(string reference) {
            //Check if the reference is not null/empty and is a valid uri
            checkReference(reference);

            SparqlResultSet results = Request.make(@"
                SELECT ?prop ?propLabel (COUNT(?pokemon) AS ?Count) WHERE {
                ?pokemon wdt:P31/wdt:P279* wd:Q3966183.
                ?pokemon " + Utils.getObjectWithUrl("wdt", reference) + @" ?prop .
                SERVICE wikibase:label { bd:serviceParam wikibase:language 'fr, en' }
                } GROUP BY ?prop ?propLabel 
            ");
            
            return resultsToObject(results);

        }
        
        private static void checkReference(string reference){
            if(String.IsNullOrEmpty(reference)){
                throw new ArgumentException("No reference argument provided");
            }
            Utils.checkURI(reference);
        }

        private static List<ParameterValue> resultsToObject (SparqlResultSet results) {
            List<ParameterValue> list = new List<ParameterValue>();
             results.Results.ForEach(row => {
                ParameterValue p = new ParameterValue(
                    row.ElementAt(0).Value.AsValuedNode().AsString(), 
                    row.ElementAt(1).Value.AsValuedNode().AsString(), 
                    (int)row.ElementAt(2).Value.AsValuedNode().AsInteger()
                );
                list.Add(p);
            });
            return list;
        }

    }
}