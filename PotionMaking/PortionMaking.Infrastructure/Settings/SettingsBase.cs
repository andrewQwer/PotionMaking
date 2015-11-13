using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace PortionMaking.Infrastructure.Settings
{
    [DebuggerDisplay("Propery: {PropertyName}, Message: {Exception.Message}")]
    public class ConvertProblem
    {
        public string PropertyName { get; set; }

        public Exception Exception { get; set; }
    }

    public abstract class SettingsBase
    {
        private readonly List<ConvertProblem> problems = new List<ConvertProblem>();
        public IEnumerable<ConvertProblem> Problems
        {
            get { return problems; }
        }

        public void AddProblem(ConvertProblem problem)
        {
            problems.Add(problem);
        }
    }
}