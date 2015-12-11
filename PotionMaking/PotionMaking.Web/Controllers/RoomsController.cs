using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using MediatR;
using PortionMaking.Infrastructure.Exceptions;
using PortionMaking.Infrastructure.Logger;
using PortionMaking.Infrastructure.Mediator.Requests;
using PortionMaking.Models.ApiModels;
using PortionMaking.Models.Constants;

namespace PotionMaking.Web.Controllers
{
    [RoutePrefix("api/rooms")]
    public class RoomsController : ApiController
    {
        private IMediator mediator;

        public RoomsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [Route("create")]
        [Authorize]
        [HttpPost]
        public IHttpActionResult CreateRoom([FromBody]CreateRoomApiModel model)
        {
            try
            {
                mediator.Send(Mapper.Map<CreateRoomRequest>(model));
            }
            catch (CustomValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                Log.Logger.Write("Error on room creation", ex);
                return BadRequest(ErrorMessages.Oops);
            }
            return Ok(model);
        }
    }
}
