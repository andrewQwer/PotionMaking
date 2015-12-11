using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNet.Identity;
using PortionMaking.Infrastructure.DAL;
using PortionMaking.Infrastructure.Identity;
using PortionMaking.Models.DAL;
using PortionMaking.Models.ViewModels;

namespace PortionMaking.Infrastructure.Mediator.Requests
{
    public class RoomExistsRequest : IRequest<bool>
    {

        public RoomExistsRequest(string userId)
        {
            UserId = userId;
        }

        public string UserId { get; set; }
    }

    public class RoomExistsRequestHandler : IRequestHandler<RoomExistsRequest, bool>
    {
        private IRepository<GameRoom> gameRoomRepo;

        public RoomExistsRequestHandler(IRepository<GameRoom> gameRoomRepo)
        {
            this.gameRoomRepo = gameRoomRepo;
        }

        public bool Handle(RoomExistsRequest request)
        {
            return gameRoomRepo.Query().Any(x => x.CreatedBy == request.UserId);
        }
    }
}