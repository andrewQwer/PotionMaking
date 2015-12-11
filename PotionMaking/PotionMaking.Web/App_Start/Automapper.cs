using AutoMapper;
using PortionMaking.Infrastructure.Automapper;

namespace PotionMaking.Web
{
    public class Automapper
    {
        public static void Register()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<AccountProfile>();
                cfg.AddProfile<RoomProfile>();
            });
        }
    }
}