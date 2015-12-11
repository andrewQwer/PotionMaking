using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using PortionMaking.Models.DAL;

namespace PortionMaking.Infrastructure.DAL.Mapping
{
    public class GameRoomMap : EntityTypeConfiguration<GameRoom>
    {
        public GameRoomMap()
        {
            ToTable("T_Game_Room");

            Property(x => x.Id)
                .HasColumnName("id")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            Property(x => x.PlayersCount)
                .HasColumnName("players_count")
                .IsRequired();

            Property(x => x.IsPrivate)
                .HasColumnName("is_private")
                .IsRequired();

            Property(x => x.Password)
                .HasColumnName("password")
                .HasMaxLength(10)
                .IsOptional();

            Property(x => x.CreatedBy)
                .HasMaxLength(256)
                .IsRequired();

            Property(x => x.CreatedDate)
                .IsRequired();

            HasKey(x => x.Id);
        }
    }
}