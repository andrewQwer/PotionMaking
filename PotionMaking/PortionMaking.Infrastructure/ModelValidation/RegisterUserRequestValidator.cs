using FluentValidation;
using PortionMaking.Infrastructure.Mediator.Requests;
using PortionMaking.Models.ViewModels;

namespace PortionMaking.Infrastructure.ModelValidation
{
    public class RegisterUserRequestValidator : AbstractValidator<RegisterUserRequest>
    {
        public RegisterUserRequestValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(x => x.Username)
                .NotEmpty();

            RuleFor(x => x.Password)
                .Length(6, 100)
                .Equal(x => x.ConfirmPassword);
        }
    }
}