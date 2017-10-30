using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace demoWebApp.Controllers.Web
{
    [Authorize]
    public class AppController: Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
