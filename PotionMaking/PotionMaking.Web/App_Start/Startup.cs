using System;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using Owin;
using PortionMaking.Infrastructure.Identity;
using PotionMaking.Web.App_Start;
using PotionMaking.Web.DependencyResolution;
using PotionMaking.Web.Providers;

namespace PotionMaking.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var httpConfig = new HttpConfiguration();

            ConfigureAuth(app);

            ConfigureWebApi(httpConfig);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            app.UseWebApi(httpConfig);
        }

        private void ConfigureWebApi(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.DependencyResolver = new StructureMapWebApiDependencyResolver(StructuremapMvc.StructureMapDependencyScope.Container);

            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }

        public void ConfigureAuth(IAppBuilder app)
        {
            Database.SetInitializer<ApplicationDbContext>(null);
            // Configure the db context, user manager and role
            // manager to use a single instance per request
            app.CreatePerOwinContext(ApplicationDbContext.Create);
            app.CreatePerOwinContext<ApplicationUserManager>(ApplicationUserManager.Create);
            app.CreatePerOwinContext<ApplicationRoleManager>(ApplicationRoleManager.Create);

            // Enables the application to temporarily store user information when
            // they are verifying the second factor in the two-factor authentication process.
            app.UseTwoFactorSignInCookie(
                DefaultAuthenticationTypes.TwoFactorCookie,
                TimeSpan.FromMinutes(5));

            // Enables the application to remember the second login verification factor such
            // as phone or email. Once you check this option, your second step of
            // verification during the login process will be remembered on the device where
            // you logged in from. This is similar to the RememberMe option when you log in.
            app.UseTwoFactorRememberBrowserCookie(
                DefaultAuthenticationTypes.TwoFactorRememberBrowserCookie);

            var OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/api/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new CustomOAuthProvider()
            };

            // Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            // Uncomment the following lines to enable logging in
            // with third party login providers
            //app.UseMicrosoftAccountAuthentication(
            //    clientId: "",
            //    clientSecret: "");


            //app.UseTwitterAuthentication(
            //   consumerKey: "",
            //   consumerSecret: "");


            //app.UseFacebookAuthentication(
            //   appId: "",
            //   appSecret: "");


            //app.UseGoogleAuthentication();
        }
    }
}