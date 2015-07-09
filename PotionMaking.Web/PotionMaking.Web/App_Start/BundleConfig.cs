using System.Web;
using System.Web.Optimization;

namespace PotionMaking.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Content/main").Include(
                "~/Scripts/Vendor/jquery/dist/jquery.js",
                "~/Scripts/Vendor/bootstrap/dist/bootstrap.js"
                ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Scripts/Vendor/bootstrap/dist/css/bootstrap.css"));
        }
    }
}
