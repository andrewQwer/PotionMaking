using System;

namespace PortionMaking.Infrastructure.Logger
{
    public class NullLog : ILog
    {
        public void AddDataProvider(ILogDataProvider provider)
        {

        }

        public void Write(string message, LogLevel level = LogLevel.Info, LogSource source = LogSource.App)
        {
        }

        public void Write(string message, Exception e, LogLevel level = LogLevel.Error, LogSource source = LogSource.App)
        {
        }
    }
}