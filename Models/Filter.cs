using System.Collections.Generic;

namespace Pokestats.Models {
    public class Filter {
        public string name { get; set; }
        public string reference { get; set; }
        public string type { get; set; }
        public List<string> values { get; set; }
    }
}