using System.Collections.Generic;

namespace Pokéstats.Models {
    public class ParameterResponse {
        public List<Parameter> parameters {get ; set ;}

        public ParameterResponse() {
            this.parameters = new List<Parameter> {
                new Parameter("Param1"), 
                new Parameter("Param2"), 
                new Parameter("Param3"), 
                new Parameter("Param4")
            };
        }

    }
}