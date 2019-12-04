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
    public class GetParameterValues {
        public static List<ParameterValue> request(string reference) {
            //Check if the reference is not null/empty and is a valid uri
            checkReference(reference);

            //Get the last part of the uri :
            //  http://www.wikidata.org/entity/P462
            //  -> P462
            string property = new System.Uri(reference).Segments.LastOrDefault() ;
            
            //Check if the property is not null/empty 
            if(String.IsNullOrEmpty(property)){
                throw new ArgumentException("The specified uri dont include a valid property");
            }

            
            var results = Request.make(@"
                SELECT ?prop ?propLabel (COUNT(?pokemon) AS ?Count) WHERE {
                ?pokemon wdt:P31/wdt:P279* wd:Q3966183.
                ?pokemon wdt:" + property + @" ?prop .
                SERVICE wikibase:label { bd:serviceParam wikibase:language 'fr ,en' }
                } GROUP BY ?prop ?propLabel 
            ");
            
            return resultsToObject(results);

        }
        
        private static void checkReference(string reference){
            if(String.IsNullOrEmpty(reference)){
                throw new ArgumentException("No reference argument provided");
            }

            if(!checkUri(reference)){
                throw new ArgumentException(reference + " is not a valid URI");
            }
        }
        
        private static bool checkUri(string uri) {
            Uri uriResult;
            return Uri.TryCreate(uri, UriKind.Absolute, out uriResult) 
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
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