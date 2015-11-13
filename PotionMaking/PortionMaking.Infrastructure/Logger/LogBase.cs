using System;
using System.Collections.Generic;

namespace PortionMaking.Infrastructure.Logger
{
    public abstract class LogBase : ILog
    {
        readonly List<ILogDataProvider> providers = new List<ILogDataProvider>();

        public void AddDataProvider(ILogDataProvider provider)
        {
            providers.Add(provider);
        }

        public void Write(LogEntry message)
        {
            foreach (var provider in providers)
            {
                provider.AppendTo(message);
            }
            WriteMessage(message);
        }

        public void Write(string message, LogLevel level = LogLevel.Info, LogSource source = LogSource.App)
        {
            var entry = new LogEntry(message, level, source);
            Write(entry);
        }

        public void Write(string message, Exception e, LogLevel level = LogLevel.Error, LogSource source = LogSource.App)
        {
            var entry = new LogEntry(message, e, level, source);
            Write(entry);
        }

        protected abstract void WriteMessage(LogEntry message);
    }
}