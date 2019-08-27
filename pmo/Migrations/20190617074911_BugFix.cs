using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class BugFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LESSONLEARNED_RELATION_USER",
                table: "LESSON_LEARNED");

            migrationBuilder.AddForeignKey(
                name: "FK_LESSONLEARNED_RELATION_USER",
                table: "LESSON_LEARNED",
                column: "UserId",
                principalTable: "USER",
                principalColumn: "USER_ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LESSONLEARNED_RELATION_USER",
                table: "LESSON_LEARNED");

            migrationBuilder.AddForeignKey(
                name: "FK_LESSONLEARNED_RELATION_USER",
                table: "LESSON_LEARNED",
                column: "PROJECT_ID",
                principalTable: "USER",
                principalColumn: "USER_ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
