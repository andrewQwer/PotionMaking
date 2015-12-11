using AutoMapper;
using PortionMaking.Infrastructure.Identity;
using PortionMaking.Infrastructure.Mediator.Requests;
using PortionMaking.Models.ApiModels;
using PortionMaking.Models.ViewModels;

namespace PortionMaking.Infrastructure.Automapper
{
    public class AccountProfile : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<CreateUserApiModel, RegisterUserRequest>();
            Mapper.CreateMap<ApplicationUser, UserViewModel>();
        }
    }
}