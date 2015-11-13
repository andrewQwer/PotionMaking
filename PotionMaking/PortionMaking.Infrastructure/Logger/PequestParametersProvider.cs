using System.Web;

namespace PortionMaking.Infrastructure.Logger
{
    public class PequestParametersProvider : ILogDataProvider
    {
        public void AppendTo(LogEntry message)
        {
            try
            {
                if (HttpContext.Current == null) return;
                var request = HttpContext.Current.Request;

                var info = new RequestInfo
                {
                    Url = request.Path,
                    Method = request.HttpMethod,
                    QueryString = request.QueryString.ToString(),
                    PostParameters = request.Form.ToString()
                };

                message.Request = info;
            }
            catch { }
        }
    }
}