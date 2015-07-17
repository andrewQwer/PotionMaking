using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PortionMaking.Infrastructure.Services;

namespace PotionMaking.Web.Controllers
{
    public class HomeController : Controller
    {
        private IAuthService authService;

        public HomeController(IAuthService authService)
        {
            this.authService = authService;
        }

        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
    }
}