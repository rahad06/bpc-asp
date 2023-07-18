using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    public partial class InterpretorModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InterpreterId",
                table: "Meetings",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Interpreters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interpreters", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Meetings_InterpreterId",
                table: "Meetings",
                column: "InterpreterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meetings_Interpreters_InterpreterId",
                table: "Meetings",
                column: "InterpreterId",
                principalTable: "Interpreters",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meetings_Interpreters_InterpreterId",
                table: "Meetings");

            migrationBuilder.DropTable(
                name: "Interpreters");

            migrationBuilder.DropIndex(
                name: "IX_Meetings_InterpreterId",
                table: "Meetings");

            migrationBuilder.DropColumn(
                name: "InterpreterId",
                table: "Meetings");
        }
    }
}
