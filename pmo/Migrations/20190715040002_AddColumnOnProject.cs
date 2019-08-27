using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddColumnOnProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PROJECT_DESCRIPTION",
                table: "PROJECT",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SCOPE_STATEMENT",
                table: "PROJECT",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PROJECT_DESCRIPTION",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "SCOPE_STATEMENT",
                table: "PROJECT");
        }
    }
}
