namespace Pokestats.Models {
    public class ParameterValue {

        public string reference { get; set; }
        public string name { get; set; }
        public int count { get; set; }

        public ParameterValue (string reference, string name, int count) {
            this.reference = reference;
            this.name = name;
            this.count = count;
        }

    }
}
       
