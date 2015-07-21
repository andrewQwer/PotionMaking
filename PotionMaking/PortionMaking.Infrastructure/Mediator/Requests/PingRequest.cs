﻿using MediatR;

namespace PortionMaking.Infrastructure.Mediator.Requests
{
    public class PingRequest: IRequest<string>
    {

    }

    public class PingHandler : IRequestHandler<PingRequest, string>
    {
        public string Handle(PingRequest request)
        {
            return "Pong";
        }
    }
}