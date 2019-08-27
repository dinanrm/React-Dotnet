using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class NewTableAndNewRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DOCUMENT_ID",
                table: "LESSON_LEARNED",
                newName: "LLCategoryId");

            migrationBuilder.CreateTable(
                name: "LESSON_LEARNED_CATEGORY",
                columns: table => new
                {
                    LLCATEGORY_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    LLCATEGORY_NAME = table.Column<string>(unicode: false, maxLength: 20, nullable: true),
                    LLCategoryCreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    LLCategoryModifiedDate = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LESSON_LEARNED_CATEGORY", x => x.LLCATEGORY_ID);
                });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_21_FK",
                table: "LESSON_LEARNED",
                column: "LLCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_LESSONLEARNED_RELATION_LLCATEGORY",
                table: "LESSON_LEARNED",
                column: "LLCategoryId",
                principalTable: "LESSON_LEARNED_CATEGORY",
                principalColumn: "LLCATEGORY_ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LESSONLEARNED_RELATION_LLCATEGORY",
                table: "LESSON_LEARNED");

            migrationBuilder.DropTable(
                name: "LESSON_LEARNED_CATEGORY");

            migrationBuilder.DropIndex(
                name: "RELATIONSHIP_21_FK",
                table: "LESSON_LEARNED");

            migrationBuilder.RenameColumn(
                name: "LLCategoryId",
                table: "LESSON_LEARNED",
                newName: "DOCUMENT_ID");
        }
    }
}
