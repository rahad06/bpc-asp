using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    public partial class companyThirdExcel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "Companies",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Research",
                table: "Companies",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Stage",
                table: "Companies",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Companies",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Research",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Stage",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Companies");
        }
    }
}
