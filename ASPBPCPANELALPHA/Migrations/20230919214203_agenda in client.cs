using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ASPBPCPANELALPHA.Migrations
{
    public partial class agendainclient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AgendaId",
                table: "Clients",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Clients_AgendaId",
                table: "Clients",
                column: "AgendaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_Agendas_AgendaId",
                table: "Clients",
                column: "AgendaId",
                principalTable: "Agendas",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_Agendas_AgendaId",
                table: "Clients");

            migrationBuilder.DropIndex(
                name: "IX_Clients_AgendaId",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "AgendaId",
                table: "Clients");
        }
    }
}
