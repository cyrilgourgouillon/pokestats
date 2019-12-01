using System;
using VDS.RDF;
using VDS.RDF.Query;
using VDS.RDF.Parsing;
using VDS.RDF.Query.Datasets;
using VDS.RDF.Writing.Formatting;
using System.Linq;
using System.Collections.Generic;
using VDS.RDF.Nodes;
using System.Dynamic;

namespace Pokestats.Models {
    public class GetParameters {

        public static List<object> request() {

            var results = Request.make(@"
                SELECT ?wd ?wdLabel ?t (COUNT(?wd) AS ?count) WHERE {
                ?pokemon wdt:P31/wdt:P279* wd:Q3966183 .
                ?pokemon ?p ?statement .
                ?wd wikibase:directClaim ?p.
                ?wd wikibase:propertyType ?t.
                FILTER (?t != wikibase:ExternalId).
                SERVICE wikibase:label { bd:serviceParam wikibase:language '[AUTO_LANGUAGE],en' }
                } GROUP by ?wd ?wdLabel ?t
                HAVING(?count > 20)");
            
            return resultsToObject(results);

        }

        private static List<object> resultsToObject (SparqlResultSet results) {
            List<object> list = new List<object>();
             results.Results.ForEach(row => {
                Parameter p = new Parameter(
                    row.ElementAt(0).Value.AsValuedNode().AsString(), 
                    row.ElementAt(1).Value.AsValuedNode().AsString(), 
                    row.ElementAt(2).Value.AsValuedNode().AsString(), 
                    (int)row.ElementAt(3).Value.AsValuedNode().AsInteger()
                );
                list.Add(p);
            });
            return list;
        }

    }
}