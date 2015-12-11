using System;
using System.Web;
using AutoMapper;
using PortionMaking.Infrastructure.Mediator.Requests;
using PortionMaking.Models.ApiModels;
using PortionMaking.Models.DAL;

namespace PortionMaking.Infrastructure.Automapper
{
    public class RoomProfile: Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<CreateRoomApiModel, CreateRoomRequest>()
                  .ForMember(x => x.CreatedBy, opt => opt.ResolveUsing((ResolutionResult r) => HttpContext.Current.User.Identity.Name));

            Mapper.CreateMap<CreateRoomRequest, GameRoom>()
                  .ForMember(x => x.CreatedDate, opt => opt.UseValue(DateTime.UtcNow));
        }
    }
}