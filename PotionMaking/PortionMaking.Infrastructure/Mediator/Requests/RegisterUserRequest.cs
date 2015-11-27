using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNet.Identity;
using PortionMaking.Infrastructure.Identity;
using PortionMaking.Models.ViewModels;

namespace PortionMaking.Infrastructure.Mediator.Requests
{
    public class RegisterUserRequest : IRequest<IdentityResult>
    {
        public string Email { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }

        public RegisterUserRequest()
        {
        }
    }

    public class RegisterUserRequestHandler : IRequestHandler<RegisterUserRequest, IdentityResult>
    {
        private ApplicationUserManager userManager;

        public RegisterUserRequestHandler(ApplicationUserManager userManager)
        {
            this.userManager = userManager;
        }

        public IdentityResult Handle(RegisterUserRequest request)
        {
            var user = new ApplicationUser()
            {
                UserName = request.Username,
                Email = request.Email,
                EmailConfirmed = true
            };

            var addUserResult = userManager.CreateAsync(user, request.Password).Result;
            return addUserResult;
        }
    }
}