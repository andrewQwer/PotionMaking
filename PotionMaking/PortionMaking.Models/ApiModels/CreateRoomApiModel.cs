namespace PortionMaking.Models.ApiModels
{
    public class CreateRoomApiModel
    {
        public int PlayersCount { get; set; }
        public bool IsPrivate { get; set; }
        public string Password { get; set; }
    }
}