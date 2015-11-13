using System;
using Microsoft.Practices.ServiceLocation;
using NLog;

namespace PortionMaking.Infrastructure.Logger
{
    public static class Log
    {
        private static Type logType = typeof(NullLog);

        private static Lazy<ILog> logger =
            new Lazy<ILog>(() => new NullLog());

        /// <summary>
        /// Get an instance of a logger.
        /// </summary>
        /// <returns>ILog instance log type has been intialized; otherwise null</returns>
        public static ILog Logger
        {
            get { return logger.Value; }
        }

        /// <summary>
        /// Sets up logging to be with a certain type
        /// </summary>
        /// <typeparam name="T">The type of ILog for the application to use</typeparam>
        public static void InitializeWith<T>(IServiceLocator locator) where T : ILog
        {
            logType = typeof(T);

            logger = new Lazy<ILog>(() => (ILog)locator.GetInstance(logType));
        }
    }
}