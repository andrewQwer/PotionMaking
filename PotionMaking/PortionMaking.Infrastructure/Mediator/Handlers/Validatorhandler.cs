using System.Linq;
using FluentValidation;
using MediatR;
using PortionMaking.Infrastructure.Exceptions;

namespace PortionMaking.Infrastructure.Mediator.Handlers
{
    public class ValidatorHandler<TRequest, TResponse>
     : IRequestHandler<TRequest, TResponse>
     where TRequest : IRequest<TResponse>
    {

        private readonly IRequestHandler<TRequest, TResponse> _inner;
        private readonly IValidator<TRequest>[] _validators;

        public ValidatorHandler(IRequestHandler<TRequest, TResponse> inner,
            IValidator<TRequest>[] validators)
        {
            _inner = inner;
            _validators = validators;
        }

        public TResponse Handle(TRequest request)
        {
            var context = new ValidationContext(request);

            var error = _validators
                .Select(v => v.Validate(context))
                .SelectMany(result => result.Errors)
                .Where(f => f != null)
                .Select(x => x.ErrorMessage)
                .FirstOrDefault();

            if (!string.IsNullOrWhiteSpace(error))
                throw new CustomValidationException(error);

            return _inner.Handle(request);
        }
    }
}