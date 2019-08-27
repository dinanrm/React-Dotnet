using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class DeleteColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PROJECT_STATUS",
                table: "LESSON_LEARNED");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PROJECT_STATUS",
                table: "LESSON_LEARNED",
                nullable: true);
        }
    }
}
