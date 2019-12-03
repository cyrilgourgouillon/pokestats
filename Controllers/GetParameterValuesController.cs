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
    [Route("api/getParameterValues")]
    public class GetParameterValuesController : ControllerBase
    {
        private readonly ILogger<GetParameterValuesController> _logger;

        public GetParameterValuesController(ILogger<GetParameterValuesController> logger)
        {
            _logger = logger;
        }

        [HttpGet()]
        public Response<List<ParameterValue>> Get(string reference)
        {
            try {
                List<ParameterValue> values = GetParameterValues.request(reference);
                return new Response<List<ParameterValue>>(values);
            } catch (Exception ex) {
                return new Response<List<ParameterValue>>(ex);
            }
        }
    }
}
