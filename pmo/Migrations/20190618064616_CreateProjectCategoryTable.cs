using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class CreateProjectCategoryTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PROJECT_CATEGORY_ID",
                table: "LESSON_LEARNED",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PROJECT_CATEGORY",
                columns: table => new
                {
                    PROJECT_CATEGORY_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PROJECT_CATEGORY_NAME = table.Column<string>(unicode: false, maxLength: 20, nullable: true),
                    PROJECT_CATEGORY_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    PROJECT_CATEGORY_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PROJECT_CATEGORY", x => x.PROJECT_CATEGORY_ID);
                });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_23_FK",
                table: "LESSON_LEARNED",
                column: "PROJECT_CATEGORY_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_LESSONLEARNED_RELATION_PROJECTCATEGORY",
                table: "LESSON_LEARNED",
                column: "PROJECT_CATEGORY_ID",
                principalTable: "PROJECT_CATEGORY",
                principalColumn: "PROJECT_CATEGORY_ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LESSONLEARNED_RELATION_PROJECTCATEGORY",
                table: "LESSON_LEARNED");

            migrationBuilder.DropTable(
                name: "PROJECT_CATEGORY");

            migrationBuilder.DropIndex(
                name: "RELATIONSHIP_23_FK",
                table: "LESSON_LEARNED");

            migrationBuilder.DropColumn(
                name: "PROJECT_CATEGORY_ID",
                table: "LESSON_LEARNED");
        }
    }
}
