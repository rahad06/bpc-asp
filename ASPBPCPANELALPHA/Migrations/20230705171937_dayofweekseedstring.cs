using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    public partial class dayofweekseedstring : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DayOfWeek",
                table: "DayOfWeekMeetings",
                type: "text",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 1,
                column: "DayOfWeek",
                value: "Monday");

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 2,
                column: "DayOfWeek",
                value: "Tuesday");

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 3,
                column: "DayOfWeek",
                value: "Wednesday");

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 4,
                column: "DayOfWeek",
                value: "Thursday");

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 5,
                column: "DayOfWeek",
                value: "Friday");

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 6,
                column: "DayOfWeek",
                value: "Saturday");

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 7,
                column: "DayOfWeek",
                value: "Sunday");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "DayOfWeek",
                table: "DayOfWeekMeetings",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 1,
                column: "DayOfWeek",
                value: 1);

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 2,
                column: "DayOfWeek",
                value: 2);

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 3,
                column: "DayOfWeek",
                value: 3);

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 4,
                column: "DayOfWeek",
                value: 4);

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 5,
                column: "DayOfWeek",
                value: 5);

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 6,
                column: "DayOfWeek",
                value: 6);

            migrationBuilder.UpdateData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyValue: 7,
                column: "DayOfWeek",
                value: 0);
        }
    }
}
