using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace PortionMaking.Infrastructure.Services
{
    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            return Task.Run(() => { });
        }
    }
}