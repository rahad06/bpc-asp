using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    public partial class meetingdateerrortimenames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartTimeSpain",
                table: "Meetings",
                newName: "SpainTime");

            migrationBuilder.RenameColumn(
                name: "StartTimeIran",
                table: "Meetings",
                newName: "IranTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpainTime",
                table: "Meetings",
                newName: "StartTimeSpain");

            migrationBuilder.RenameColumn(
                name: "IranTime",
                table: "Meetings",
                newName: "StartTimeIran");
        }
    }
}
