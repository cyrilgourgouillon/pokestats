using System;
using System.Linq;
using System.Text;

namespace Pokestats.Models {
    public class Utils {
        public static void checkURI(string uri){
            Uri uriResult;
            if(!(Uri.TryCreate(uri, UriKind.Absolute, out uriResult) && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps))){
                throw new ArgumentException(uri + " is not a valid URI");
            }
        }

        public static string normalizeName(string name) {
            StringBuilder sb = new StringBuilder();
            foreach (char c in name) {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '.' || c == '_') {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }

        public static string getObjectWithUrl(string prefix, string url) {
            checkURI(url);
            string property = new System.Uri(url).Segments.LastOrDefault() ;
            if(String.IsNullOrEmpty(property)) {
                throw new ArgumentException("The URL \" "+ url +" \" don't include a valid property");
            }
            return prefix + ":" + property;
        }

    }
}