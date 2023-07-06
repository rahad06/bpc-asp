using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    public partial class comapnydetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Pusto",
                table: "Companies",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pusto",
                table: "Companies");
        }
    }
}
