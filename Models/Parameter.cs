namespace Pokestats.Models {
    public class Parameter {

        public string reference { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public int count { get; set; }

        public Parameter (string reference, string name, string type, int count) {
            this.reference = reference;
            this.name = name;
            this.type = type;
            this.count = count;
        }

    }
}
       
