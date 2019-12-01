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
    [Route("api/getParameters")]
    public class GetParametersController : ControllerBase
    {
        private readonly ILogger<GetParametersController> _logger;

        public GetParametersController(ILogger<GetParametersController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<object> Get()
        {
            return GetParameters.request();
        }
    }
}
