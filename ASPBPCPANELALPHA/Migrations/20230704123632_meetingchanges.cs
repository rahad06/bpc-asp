using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    public partial class meetingchanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
        //     migrationBuilder.CreateTable(
        //         name: "Industries",
        //         columns: table => new
        //         {
        //             Id = table.Column<int>(type: "integer", nullable: false)
        //                 .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
        //             Name = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Industries", x => x.Id);
        //         });
        //
        //     migrationBuilder.CreateTable(
        //         name: "MeetingStatuses",
        //         columns: table => new
        //         {
        //             MeetingStatusId = table.Column<int>(type: "integer", nullable: false)
        //                 .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
        //             Status = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_MeetingStatuses", x => x.MeetingStatusId);
        //         });
        //
        //     migrationBuilder.CreateTable(
        //         name: "Clients",
        //         columns: table => new
        //         {
        //             Id = table.Column<int>(type: "integer", nullable: false)
        //                 .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
        //             Name = table.Column<string>(type: "text", nullable: false),
        //             Website = table.Column<string>(type: "text", nullable: false),
        //             Representative = table.Column<string>(type: "text", nullable: false),
        //             IndustryId = table.Column<int>(type: "integer", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Clients", x => x.Id);
        //             table.ForeignKey(
        //                 name: "FK_Clients_Industries_IndustryId",
        //                 column: x => x.IndustryId,
        //                 principalTable: "Industries",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //         });
        //
        //     migrationBuilder.CreateTable(
        //         name: "Companies",
        //         columns: table => new
        //         {
        //             Id = table.Column<int>(type: "integer", nullable: false)
        //                 .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
        //             Name = table.Column<string>(type: "text", nullable: false),
        //             IndustryId = table.Column<int>(type: "integer", nullable: false),
        //             ContactName = table.Column<string>(type: "text", nullable: false),
        //             Salutation = table.Column<string>(type: "text", nullable: false),
        //             Mobile = table.Column<string>(type: "text", nullable: false),
        //             Phone = table.Column<string>(type: "text", nullable: false),
        //             Email = table.Column<string>(type: "text", nullable: false),
        //             WebPage = table.Column<string>(type: "text", nullable: false),
        //             Address = table.Column<string>(type: "text", nullable: false),
        //             Comments = table.Column<string>(type: "text", nullable: false),
        //             Employees = table.Column<int>(type: "integer", nullable: true),
        //             Experience = table.Column<string>(type: "text", nullable: false),
        //             RegistroMercantil = table.Column<string>(type: "text", nullable: false),
        //             IdentificacionNacional = table.Column<string>(type: "text", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Companies", x => x.Id);
        //             table.ForeignKey(
        //                 name: "FK_Companies_Industries_IndustryId",
        //                 column: x => x.IndustryId,
        //                 principalTable: "Industries",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //         });
        //
        //     migrationBuilder.CreateTable(
        //         name: "Meetings",
        //         columns: table => new
        //         {
        //             MeetingId = table.Column<int>(type: "integer", nullable: false)
        //                 .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
        //             ClientId = table.Column<int>(type: "integer", nullable: false),
        //             CompanyId = table.Column<int>(type: "integer", nullable: false),
        //             MeetingDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
        //             MeetingStatusId = table.Column<int>(type: "integer", nullable: false),
        //             CompanyName = table.Column<string>(type: "text", nullable: false),
        //             SpainTime = table.Column<TimeSpan>(type: "interval", nullable: false),
        //             IranTime = table.Column<TimeSpan>(type: "interval", nullable: false)
        //         },
        //         constraints: table =>
        //         {
        //             table.PrimaryKey("PK_Meetings", x => x.MeetingId);
        //             table.ForeignKey(
        //                 name: "FK_Meetings_Clients_ClientId",
        //                 column: x => x.ClientId,
        //                 principalTable: "Clients",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //             table.ForeignKey(
        //                 name: "FK_Meetings_Companies_CompanyId",
        //                 column: x => x.CompanyId,
        //                 principalTable: "Companies",
        //                 principalColumn: "Id",
        //                 onDelete: ReferentialAction.Cascade);
        //             table.ForeignKey(
        //                 name: "FK_Meetings_MeetingStatuses_MeetingStatusId",
        //                 column: x => x.MeetingStatusId,
        //                 principalTable: "MeetingStatuses",
        //                 principalColumn: "MeetingStatusId",
        //                 onDelete: ReferentialAction.Cascade);
        //         });
        //
        //     migrationBuilder.InsertData(
        //         table: "MeetingStatuses",
        //         columns: new[] { "MeetingStatusId", "Status" },
        //         values: new object[,]
        //         {
        //             { 1, "Pending" },
        //             { 2, "In Progress" },
        //             { 3, "Done" }
        //         });
        //
        //     migrationBuilder.CreateIndex(
        //         name: "IX_Clients_IndustryId",
        //         table: "Clients",
        //         column: "IndustryId");
        //
        //     migrationBuilder.CreateIndex(
        //         name: "IX_Companies_IndustryId",
        //         table: "Companies",
        //         column: "IndustryId");
        //
        //     migrationBuilder.CreateIndex(
        //         name: "IX_Meetings_ClientId",
        //         table: "Meetings",
        //         column: "ClientId");
        //
        //     migrationBuilder.CreateIndex(
        //         name: "IX_Meetings_CompanyId",
        //         table: "Meetings",
        //         column: "CompanyId");
        //
        //     migrationBuilder.CreateIndex(
        //         name: "IX_Meetings_MeetingStatusId",
        //         table: "Meetings",
        //         column: "MeetingStatusId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Meetings");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "MeetingStatuses");

            migrationBuilder.DropTable(
                name: "Industries");
        }
    }
}
