using System.Collections.Generic;

namespace Pokestats.Models {
    public class Values {
        public string name {get ; set;}
        public List<string> vals {get ; set;}

        public Values(string name, List<string> vals) {
            this.name = name;
            this.vals = vals;
        }
    }
}