using System.Data.Entity;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using PortionMaking.Infrastructure.Identity;
using StructureMap.Configuration.DSL;

namespace PotionMaking.Web.DependencyResolution.Registries
{
    public class IdentityRegistry : Registry
    {
        public IdentityRegistry()
        {
            //For<DbContext>().Use<ApplicationDbContext>();
            For<ApplicationUserManager>().Use(() => HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>());
            //For<IUserStore<ApplicationUser>>().Use<UserStore<ApplicationUser>>();
        }
    }
}