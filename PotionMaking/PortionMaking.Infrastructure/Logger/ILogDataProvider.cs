namespace PortionMaking.Infrastructure.Logger
{
    public interface ILogDataProvider
    {
        /// <summary>
        /// Append data to message
        /// </summary>
        void AppendTo(LogEntry message);
    }
}