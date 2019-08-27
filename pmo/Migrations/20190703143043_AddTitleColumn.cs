using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddTitleColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TITLE",
                table: "LESSON_LEARNED",
                unicode: false,
                maxLength: 50,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TITLE",
                table: "LESSON_LEARNED");
        }
    }
}
