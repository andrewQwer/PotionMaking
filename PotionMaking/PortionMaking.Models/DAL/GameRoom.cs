using System;

namespace PortionMaking.Models.DAL
{
    public class GameRoom
    {
        public Guid Id { get; set; }
        public int PlayersCount { get; set; }
        public bool IsPrivate { get; set; }
        public string Password { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}