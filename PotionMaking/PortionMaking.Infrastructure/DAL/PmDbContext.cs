using System.Data.Entity;
using System.Reflection;
using PortionMaking.Infrastructure.DAL.Mapping;
using PortionMaking.Models.DAL;

namespace PortionMaking.Infrastructure.DAL
{
    public class PmDbContext : DbContext
    {
        public virtual DbSet<GameRoom> GameRoom { get; set; }

        public PmDbContext() : base("dbConnection")
        {
            Database.Log = sql => System.Diagnostics.Debug.Write(sql);
            Database.SetInitializer<PmDbContext>(null);
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.AddFromAssembly(Assembly.GetAssembly(typeof(GameRoomMap)));
        }

    }
}