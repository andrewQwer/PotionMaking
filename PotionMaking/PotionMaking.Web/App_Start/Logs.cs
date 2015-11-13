using System.Web.Mvc;
using Microsoft.Practices.ServiceLocation;
using PortionMaking.Infrastructure.Logger;

namespace PotionMaking.Web
{
    public class Logs
    {
        public static void Configure()
        {
            var locator = DependencyResolver.Current.GetService<IServiceLocator>();
            Log.InitializeWith<LogentriesLog>(locator);

            Log.Logger.AddDataProvider(new PequestParametersProvider());
        }
    }
}