using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class RenameColumn_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProjectCategoryId",
                table: "MILESTONE",
                newName: "PROJECT_CATEGORY_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PROJECT_CATEGORY_ID",
                table: "MILESTONE",
                newName: "ProjectCategoryId");
        }
    }
}
