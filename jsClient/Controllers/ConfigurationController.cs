using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Prometheus.Web.Html5.Controllers
{
    [Route("api/[controller]")]
    public class ConfigurationController : Controller
    {
        #region Fields
        private IConfiguration _configuration;
        #endregion

        #region Construction
        public ConfigurationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        #endregion

        [HttpGet]
        [Route("currentConfiguration")]
        public IActionResult Get()
        {
            var result = new
            {
                identityServerUrl = _configuration["IdentityServerUri"] + "connect/token",
                webApiBaseUrl = _configuration["WebApiUri"]
            };

            return new JsonResult(result);
        }
    }
}
