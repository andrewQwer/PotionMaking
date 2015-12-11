using System;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNet.Identity;
using PortionMaking.Infrastructure.DAL;
using PortionMaking.Infrastructure.Identity;
using PortionMaking.Models.ViewModels;
using PortionMaking.Models.DAL;

namespace PortionMaking.Infrastructure.Mediator.Requests
{
    public class CreateRoomRequest : IRequest<Unit>
    {
        public int PlayersCount { get; set; }
        public bool IsPrivate { get; set; }
        public string Password { get; set; }
        public string CreatedBy { get; set; }
    }

    public class CreateRoomRequestHandler : IRequestHandler<CreateRoomRequest, Unit>
    {
        private IRepository<GameRoom> roomRepo;

        public CreateRoomRequestHandler(IRepository<GameRoom> roomRepo)
        {
            this.roomRepo = roomRepo;
        }

        public Unit Handle(CreateRoomRequest request)
        {
            var room = Mapper.Map<GameRoom>(request);
            roomRepo.Add(room);
            return Unit.Value;
        }
    }
}