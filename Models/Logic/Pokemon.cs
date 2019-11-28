namespace Pokéstats.Models {
    public class Pokemon {
        public string name { get; set; }
        public string color{ get; set; }

        public override string ToString(){
            return "Pokémon " + this.name + " is " + this.color;
        }
    }
}

