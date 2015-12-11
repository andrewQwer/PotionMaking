namespace PortionMaking.Infrastructure.Migrations.PmDb
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class PmDbMigration : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.T_Game_Room",
                c => new
                    {
                        id = c.Guid(nullable: false, identity: true),
                        players_count = c.Int(nullable: false),
                        is_private = c.Boolean(nullable: false),
                        password = c.String(maxLength: 10),
                        CreatedBy = c.String(nullable: false, maxLength: 256),
                        CreatedDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.id);

        }

        public override void Down()
        {
            DropTable("dbo.T_Game_Room");
        }
    }
}
