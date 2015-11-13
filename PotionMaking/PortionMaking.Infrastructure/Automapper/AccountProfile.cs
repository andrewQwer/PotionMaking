using AutoMapper;
using PortionMaking.Infrastructure.Mediator.Requests;
using PortionMaking.Models.ViewModels;

namespace PortionMaking.Infrastructure.Automapper
{
    public class AccountProfile : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<CreateUserViewModel, RegisterUserRequest>();
        }
    }
}