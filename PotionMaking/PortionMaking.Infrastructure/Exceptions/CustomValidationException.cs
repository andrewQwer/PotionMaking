using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using FluentValidation.Results;

namespace PortionMaking.Infrastructure.Exceptions
{
    [Serializable]
    public class CustomValidationException : Exception
    {
        //
        // For guidelines regarding the creation of new exception types, see
        //    http://msdn.microsoft.com/library/default.asp?url=/library/en-us/cpgenref/html/cpconerrorraisinghandlingguidelines.asp
        // and
        //    http://msdn.microsoft.com/library/default.asp?url=/library/en-us/dncscol/html/csharp07192001.asp
        //

        public CustomValidationException(string message) : base(message)
        {
        }

        public CustomValidationException(string message, Exception inner) : base(message, inner)
        {
        }

        protected CustomValidationException(
            SerializationInfo info,
            StreamingContext context) : base(info, context)
        {
        }
    }
}