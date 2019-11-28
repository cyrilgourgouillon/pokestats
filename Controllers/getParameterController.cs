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
    public class getParametersController : ControllerBase
    {
        // GET api/getParameters
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return Ok(new ParameterResponse());
        }

    }
}
