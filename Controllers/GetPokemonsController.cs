using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Pokestats.Models;

namespace Pokestats.Controllers
{
    [ApiController]
    [Route("api/getPokemons")]
    public class GetPokemonsController : ControllerBase
    {
        private readonly ILogger<GetPokemonsController> _logger;

        public GetPokemonsController(ILogger<GetPokemonsController> logger)
        {
            _logger = logger;
        }

    
        [HttpPost()]
        public Response<List<Pokemon>> Post([FromBody] List<Filter> filters)
        {
            try {
                List<Pokemon> pokemons = GetPokemons.request(filters);
                return new Response<List<Pokemon>>(pokemons);
            } catch (Exception ex) {
                return new Response<List<Pokemon>>(ex);
            }
        }

    }
}
