using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    public partial class dayofweekseedincontext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DayOfWeekMeetingsId",
                table: "Meetings",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "DayOfWeekMeetings",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DayOfWeekMeetings",
                table: "DayOfWeekMeetings",
                column: "Id");

            migrationBuilder.InsertData(
                table: "DayOfWeekMeetings",
                columns: new[] { "Id", "DayOfWeek" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 },
                    { 3, 3 },
                    { 4, 4 },
                    { 5, 5 },
                    { 6, 6 },
                    { 7, 0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Meetings_DayOfWeekMeetingsId",
                table: "Meetings",
                column: "DayOfWeekMeetingsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meetings_DayOfWeekMeetings_DayOfWeekMeetingsId",
                table: "Meetings",
                column: "DayOfWeekMeetingsId",
                principalTable: "DayOfWeekMeetings",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meetings_DayOfWeekMeetings_DayOfWeekMeetingsId",
                table: "Meetings");

            migrationBuilder.DropIndex(
                name: "IX_Meetings_DayOfWeekMeetingsId",
                table: "Meetings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DayOfWeekMeetings",
                table: "DayOfWeekMeetings");

            migrationBuilder.DeleteData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "DayOfWeekMeetings",
                keyColumn: "Id",
                keyColumnType: "integer",
                keyValue: 7);

            migrationBuilder.DropColumn(
                name: "DayOfWeekMeetingsId",
                table: "Meetings");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "DayOfWeekMeetings");
        }
    }
}
