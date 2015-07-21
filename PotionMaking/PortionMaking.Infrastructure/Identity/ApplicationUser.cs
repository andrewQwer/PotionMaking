using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.Cookies;

namespace PortionMaking.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        // A default Constructor:
        public ApplicationUser()
        {
            CreatedDate = DateTime.UtcNow;
        }

        public DateTime CreatedDate { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authType = DefaultAuthenticationTypes.ApplicationCookie)
        {
            // Note the authenticationType must match the one
            // defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity =
                await manager.CreateIdentityAsync(this, authType);

            // Add custom user claims here
            return userIdentity;
        }
    }
}