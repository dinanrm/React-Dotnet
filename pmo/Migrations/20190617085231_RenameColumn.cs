using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class RenameColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "LESSON_LEARNED",
                newName: "USER_ID");

            migrationBuilder.RenameColumn(
                name: "LLCategoryId",
                table: "LESSON_LEARNED",
                newName: "LL_CATEGORY_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "USER_ID",
                table: "LESSON_LEARNED",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "LL_CATEGORY_ID",
                table: "LESSON_LEARNED",
                newName: "LLCategoryId");
        }
    }
}
