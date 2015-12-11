using FluentValidation;
using MediatR;
using PortionMaking.Infrastructure.Mediator.Requests;

namespace PortionMaking.Infrastructure.ModelValidation
{
    public class CreateRoomRequestValidator : AbstractValidator<CreateRoomRequest>
    {

        public CreateRoomRequestValidator(IMediator mediator)
        {
            RuleFor(x => x.PlayersCount)
                .InclusiveBetween(2, 4);

            RuleFor(x => x.Password)
                .NotNull()
                .Length(6, 10)
                .When(x => x.IsPrivate);

            RuleFor(x => x.CreatedBy)
                .NotNull()
                .Must(s => !mediator.Send(new RoomExistsRequest(s)));
        }
    }
}