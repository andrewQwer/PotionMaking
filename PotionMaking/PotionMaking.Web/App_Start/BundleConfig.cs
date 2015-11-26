using System.Web;
using System.Web.Optimization;

namespace PotionMaking.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/Vendor/jquery/dist/jquery.js",
                "~/Scripts/Vendor/jquery-validation/dist/jquery.validate.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/Vendor/bootstrap/dist/js/bootstrap.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/Scripts/Vendor/toastr/toastr.js",
                "~/Scripts/bundle.js"
                ));


            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Scripts/Vendor/bootstrap/dist/css/bootstrap.css",
                "~/Scripts/Vendor/toastr/toastr.css"
                ));
        }
    }
}