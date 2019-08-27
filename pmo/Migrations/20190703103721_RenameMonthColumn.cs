using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class RenameMonthColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Month",
                table: "DOCUMENT",
                newName: "MONTH");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MONTH",
                table: "DOCUMENT",
                newName: "Month");
        }
    }
}
