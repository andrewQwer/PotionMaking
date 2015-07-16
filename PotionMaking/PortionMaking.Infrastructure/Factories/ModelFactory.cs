using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http.Routing;
using PortionMaking.Infrastructure.Identity;
using PortionMaking.Infrastructure.Models;

namespace PortionMaking.Infrastructure.Factories
{
    public class ModelFactory
    {
        private UrlHelper _UrlHelper;
        private ApplicationUserManager _AppUserManager;

        public ModelFactory(HttpRequestMessage request, ApplicationUserManager appUserManager)
        {
            _UrlHelper = new UrlHelper(request);
            _AppUserManager = appUserManager;
        }

        public UserReturnModel Create(ApplicationUser appUser)
        {
            return new UserReturnModel
            {
                Url = _UrlHelper.Link("GetUserById", new {id = appUser.Id}),
                Id = appUser.Id,
                UserName = appUser.UserName,
                Email = appUser.Email,
                CreatedDate = appUser.CreatedDate,
                EmailConfirmed = appUser.EmailConfirmed,
                Roles = _AppUserManager.GetRolesAsync(appUser.Id).Result,
                Claims = _AppUserManager.GetClaimsAsync(appUser.Id).Result
            };
        }
    }
}

