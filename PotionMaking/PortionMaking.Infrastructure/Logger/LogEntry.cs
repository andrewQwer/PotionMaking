using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using Newtonsoft.Json;

namespace PortionMaking.Infrastructure.Logger
{
    public class ExceptionInfo
    {
        public string Message { get; set; }
        public string StackTrace { get; set; }
    }

    public class RequestInfo
    {
        public string Url { get; set; }
        public string Method { get; set; }
        public string QueryString { get; set; }
        public string PostParameters { get; set; }
    }

    public class UserInfo
    {
        public string Login { get; set; }
        public int LoginId { get; set; }

        public string SuperLogin { get; set; }
        public string SuperLoginId { get; set; }

        public int CompanyId { get; set; }
        public int DisplayCompanyId { get; set; }

    }

    public class LogEntryLite
    {
        public string Id { get; set; }

        public string Source { get; set; }

        public LogLevel Level { get; set; }

        public DateTime Timestamp { get; set; }

        public string Message { get; set; }

        public string Host { get; set; }

        public LogEntryLite() { } // for deserialization

        public LogEntryLite(string message, LogLevel level = LogLevel.Info, params LogSource[] sources)
        {
            Timestamp = DateTime.UtcNow;
            Message = message;
            Level = level;

            //App tag is default
            if (!sources.Any())
                sources = new[] { LogSource.App };

            //tags should be unique
            sources = sources.Distinct().ToArray();

            Source = string.Join(" ", sources.Select(t => string.Format("~{0}~", t)));

            try
            {
                Host = Dns.GetHostName();
            }
            catch (Exception)
            {
                Host = "N/A";
            }
        }
    }

    public class LogEntry : LogEntryLite
    {
        public IList<ExceptionInfo> ErrorList { get; set; }

        public RequestInfo Request { get; set; }
        public UserInfo User { get; set; }

        public LogEntry(string message, LogLevel level = LogLevel.Info, params LogSource[] source)
            : base(message, level, source)
        {
        }

        public LogEntry(string message, Exception e, LogLevel level = LogLevel.Error, params LogSource[] source)
            : this(message, level, source)
        {
            ErrorList = new List<ExceptionInfo>();

            LoadExceptionInfo(e);
        }

        public LogEntry()
        {

        }

        /// <summary>
        /// Returns properties in specific format and in specific order
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            var sb = new StringBuilder();

            //lite model
            sb.Append(Source);

            sb.AppendFormat(" Message=\"{0}\"", Message);

            sb.AppendFormat(" Host=\"{0}\"", Host);

            //user info
            if (User != null)
                sb.AppendFormat(" {{\"User\":{0}}}", JsonConvert.SerializeObject(User));

            //request
            if (Request != null)
                sb.AppendFormat(" {{\"Request\":{0}}}", JsonConvert.SerializeObject(Request));

            //exceptions
            if (ErrorList != null)
                sb.AppendFormat(" {{\"Exceptions\":{0}}}", JsonConvert.SerializeObject(ErrorList));

            return sb.ToString();
        }

        private void LoadExceptionInfo(Exception e)
        {
            ErrorList.Add(new ExceptionInfo
            {
                Message = e.Message,
                StackTrace = e.StackTrace,
            });

            if (e.InnerException != null)
                LoadExceptionInfo(e.InnerException);
        }
    }

    #region Extensions

    public static class Extensions
    {
        public static NLog.LogLevel ToNlogLevel(this LogLevel level)
        {
            var result = level == LogLevel.Debug ? NLog.LogLevel.Debug :
                         level == LogLevel.Info ? NLog.LogLevel.Info :
                         level == LogLevel.Warning ? NLog.LogLevel.Warn :
                         level == LogLevel.Error ? NLog.LogLevel.Error :
                         level == LogLevel.Fatal ? NLog.LogLevel.Fatal :
                                                     NLog.LogLevel.Off;
            return result;
        }
    }
    #endregion
}