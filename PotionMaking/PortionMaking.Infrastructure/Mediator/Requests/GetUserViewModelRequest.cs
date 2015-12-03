using AutoMapper;
using MediatR;
using PortionMaking.Infrastructure.Identity;
using PortionMaking.Models.ViewModels;

namespace PortionMaking.Infrastructure.Mediator.Requests
{
    public class GetUserViewModelRequest : IRequest<UserViewModel>
    {
        public string Username { get; set; }

        public GetUserViewModelRequest(string name)
        {
            Username = name;
        }
    }

    public class GetUserRequestHandler : IRequestHandler<GetUserViewModelRequest, UserViewModel>
    {
        private ApplicationUserManager userManager;

        public GetUserRequestHandler(ApplicationUserManager userManager)
        {
            this.userManager = userManager;
        }

        public UserViewModel Handle(GetUserViewModelRequest request)
        {
            var user = userManager.FindByNameAsync(request.Username).Result;
            return Mapper.Map<UserViewModel>(user);
        }
    }
}