using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    public partial class meetingtimechange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IranTime",
                table: "Meetings");

            migrationBuilder.DropColumn(
                name: "SpainTime",
                table: "Meetings");

            migrationBuilder.RenameColumn(
                name: "CompanyName",
                table: "Meetings",
                newName: "Representative");

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTimeIran",
                table: "Meetings",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTimeSpain",
                table: "Meetings",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartTimeIran",
                table: "Meetings");

            migrationBuilder.DropColumn(
                name: "StartTimeSpain",
                table: "Meetings");

            migrationBuilder.RenameColumn(
                name: "Representative",
                table: "Meetings",
                newName: "CompanyName");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "IranTime",
                table: "Meetings",
                type: "interval",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "SpainTime",
                table: "Meetings",
                type: "interval",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }
    }
}
