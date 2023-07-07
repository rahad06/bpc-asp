using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    public partial class allmstatuses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "MeetingStatuses",
                keyColumn: "MeetingStatusId",
                keyValue: 1,
                column: "Status",
                value: "Confirmed");

            migrationBuilder.UpdateData(
                table: "MeetingStatuses",
                keyColumn: "MeetingStatusId",
                keyValue: 2,
                column: "Status",
                value: "Pending");

            migrationBuilder.UpdateData(
                table: "MeetingStatuses",
                keyColumn: "MeetingStatusId",
                keyValue: 3,
                column: "Status",
                value: "In Progress");

            migrationBuilder.InsertData(
                table: "MeetingStatuses",
                columns: new[] { "MeetingStatusId", "Status" },
                values: new object[,]
                {
                    { 4, "Done" },
                    { 5, "Confirmed Pending Hour" },
                    { 6, "Pending Conf. Date And Time" },
                    { 7, "Probably Wont be Confirmed" },
                    { 8, "Cancelled in Last Minute" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MeetingStatuses",
                keyColumn: "MeetingStatusId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "MeetingStatuses",
                keyColumn: "MeetingStatusId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "MeetingStatuses",
                keyColumn: "MeetingStatusId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "MeetingStatuses",
                keyColumn: "MeetingStatusId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "MeetingStatuses",
                keyColumn: "MeetingStatusId",
                keyValue: 8);

            migrationBuilder.UpdateData(
                table: "MeetingStatuses",
                keyColumn: "MeetingStatusId",
                keyValue: 1,
                column: "Status",
                value: "Pending");

            migrationBuilder.UpdateData(
                table: "MeetingStatuses",
                keyColumn: "MeetingStatusId",
                keyValue: 2,
                column: "Status",
                value: "In Progress");

            migrationBuilder.UpdateData(
                table: "MeetingStatuses",
                keyColumn: "MeetingStatusId",
                keyValue: 3,
                column: "Status",
                value: "Done");
        }
    }
}
