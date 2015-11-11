using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNet.Identity;
using PortionMaking.Infrastructure.Identity;
using PortionMaking.Models.ViewModels;

namespace PortionMaking.Infrastructure.Mediator.Requests
{
    public class RegisterUserRequest : IAsyncRequest<IdentityResult>
    {
        public CreateUserViewModel CreateUserModel { get; set; }

        public RegisterUserRequest(CreateUserViewModel createUserModel)
        {
            CreateUserModel = createUserModel;
        }
    }

    public class RegisterUserRequestHandler : IAsyncRequestHandler<RegisterUserRequest, IdentityResult>
    {
        private ApplicationUserManager userManager;

        public RegisterUserRequestHandler(ApplicationUserManager userManager)
        {
            this.userManager = userManager;
        }

        public async Task<IdentityResult> Handle(RegisterUserRequest request)
        {
            var user = new ApplicationUser()
            {
                UserName = request.CreateUserModel.Username,
                Email = request.CreateUserModel.Email
            };

            var addUserResult = await userManager.CreateAsync(user, request.CreateUserModel.Password);
            return addUserResult;
        }
    }
}