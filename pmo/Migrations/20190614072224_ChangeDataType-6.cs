using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class ChangeDataType6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CATEGORY",
                table: "LESSON_LEARNED");

            migrationBuilder.AddColumn<int>(
                name: "PROJECT_STATUS",
                table: "LESSON_LEARNED",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PROJECT_STATUS",
                table: "LESSON_LEARNED");

            migrationBuilder.AddColumn<string>(
                name: "CATEGORY",
                table: "LESSON_LEARNED",
                unicode: false,
                maxLength: 20,
                nullable: true);
        }
    }
}
