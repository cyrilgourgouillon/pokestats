using System.Collections.Generic;

namespace Pokestats.Models {
    public class Pokemon {

        public string name {get ; set;}
        public List<Values> values {get ; set;}

        public Pokemon(string name, List<Values> values){
            this.name = name;
            this.values = values;
        }
    }
}