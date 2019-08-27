using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DOCUMENT_ID",
                table: "LESSON_LEARNED",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IMPACT",
                table: "LESSON_LEARNED",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RECOMMENDATION",
                table: "LESSON_LEARNED",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LESSON_LEARNED_ID",
                table: "DOCUMENT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_20_FK",
                table: "DOCUMENT",
                column: "LESSON_LEARNED_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_DOCUMENT_RELATIONS_LESSON_LEARNED",
                table: "DOCUMENT",
                column: "LESSON_LEARNED_ID",
                principalTable: "LESSON_LEARNED",
                principalColumn: "LESSON_LEARNED_ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DOCUMENT_RELATIONS_LESSON_LEARNED",
                table: "DOCUMENT");

            migrationBuilder.DropIndex(
                name: "RELATIONSHIP_20_FK",
                table: "DOCUMENT");

            migrationBuilder.DropColumn(
                name: "DOCUMENT_ID",
                table: "LESSON_LEARNED");

            migrationBuilder.DropColumn(
                name: "IMPACT",
                table: "LESSON_LEARNED");

            migrationBuilder.DropColumn(
                name: "RECOMMENDATION",
                table: "LESSON_LEARNED");

            migrationBuilder.DropColumn(
                name: "LESSON_LEARNED_ID",
                table: "DOCUMENT");
        }
    }
}
