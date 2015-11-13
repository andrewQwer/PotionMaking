using System;
using System.Collections.Generic;
using NLog;

namespace PortionMaking.Infrastructure.Logger
{
    public interface ILog
    {
        void AddDataProvider(ILogDataProvider provider);
        void Write(string message, LogLevel level = LogLevel.Info, LogSource source = LogSource.App);

        void Write(string message, Exception e, LogLevel level = LogLevel.Error, LogSource source = LogSource.App);
    }
}