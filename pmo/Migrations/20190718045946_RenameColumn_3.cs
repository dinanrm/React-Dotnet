using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class RenameColumn_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ESTIMATED_START_TIME",
                table: "MILESTONE",
                newName: "ESTIMATED_END_TIME");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ESTIMATED_END_TIME",
                table: "MILESTONE",
                newName: "ESTIMATED_START_TIME");
        }
    }
}
