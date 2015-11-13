using System;
using NLog;

namespace PortionMaking.Infrastructure.Logger
{
    public class LogentriesLog : LogBase
    {
        readonly NLog.Logger logger;

        public LogentriesLog()
        {
            logger = LogManager.GetCurrentClassLogger();
        }

        ~LogentriesLog()
        {
            // This will give LE background thread some time to finish sending messages to Logentries.
            //https://github.com/logentries/le_dotnet#shutting-down-the-logger-1
            var numWaits = 3;
            while (!LogentriesCore.Net.AsyncLogger.AreAllQueuesEmpty(TimeSpan.FromSeconds(5)) && numWaits > 0)
                numWaits--;
        }

        protected override void WriteMessage(LogEntry message)
        {
            var level = message.Level.ToNlogLevel();
            var msg = message.ToString();

            logger.Log(level, msg);
            logger.Debug(msg);
            logger.Error(msg);
            logger.Info(msg);
            logger.Info(msg);
        }
    }
}