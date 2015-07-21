using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MediatR;
using PortionMaking.Infrastructure.Mediator.Requests;
using PortionMaking.Infrastructure.Services;

namespace PotionMaking.Web.Controllers
{
    public class HomeController : Controller
    {
        private IAuthService authService;
        private IMediator mediator;

        public HomeController(IAuthService authService, IMediator mediator)
        {
            this.authService = authService;
            this.mediator = mediator;
        }

        // GET: Home
        public ActionResult Index()
        {
            var res = mediator.Send(new PingRequest());
            return View();
        }
    }
}