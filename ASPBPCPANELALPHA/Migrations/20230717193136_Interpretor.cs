using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    public partial class Interpretor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Representative",
                table: "Meetings",
                newName: "Interpreter");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Interpreter",
                table: "Meetings",
                newName: "Representative");
        }
    }
}
