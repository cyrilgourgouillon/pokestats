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
        public Response<List<Parameter>> Get()
        {
            try {
                List<Parameter> parameters = GetParameters.request();
                return new Response<List<Parameter>>(parameters);
            } catch (Exception ex) {
                return new Response<List<Parameter>>(ex);
            }  
        }
    }
}
