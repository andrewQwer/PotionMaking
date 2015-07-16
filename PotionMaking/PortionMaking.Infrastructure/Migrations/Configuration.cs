using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using PortionMaking.Infrastructure.Identity;

namespace PortionMaking.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PortionMaking.Infrastructure.Identity.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(PortionMaking.Infrastructure.Identity.ApplicationDbContext context)
        {
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            var user = new ApplicationUser()
            {
                UserName = "SuperPowerUser",
                Email = "taiseer.joudeh@mymail.com",
                EmailConfirmed = true
            };

            manager.Create(user, "MySuperP@ssword!");
        }
    }
}
