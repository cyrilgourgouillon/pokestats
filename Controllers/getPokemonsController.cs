using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pokéstats.Models;

namespace Pokéstats.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class getPokemonController : ControllerBase
    {
         // POST api/getPokemon
        [HttpPost]
        public ActionResult<IEnumerable<string>> Post([FromBody] Pokemon p)
        {
            if (p == null) return BadRequest();
            return Ok(p);
        }
    }
}
