using System;
using VDS.RDF.Query;

namespace Pokestats.Models {
    public class Request {
        public static SparqlResultSet make (string request) {
            SparqlRemoteEndpoint endpoint = new SparqlRemoteEndpoint(new Uri("https://query.wikidata.org/sparql"), "https://query.wikidata.org/sparql");       
            endpoint.UserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36";
            return endpoint.QueryWithResultSet(request);
        }
    }
}