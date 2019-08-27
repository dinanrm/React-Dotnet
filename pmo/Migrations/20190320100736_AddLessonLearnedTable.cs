using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddLessonLearnedTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LESSON_LEARNED",
                columns: table => new
                {
                    LESSON_LEARNED_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PROJECT_ID = table.Column<int>(nullable: true),
                    CATEGORY = table.Column<string>(unicode: false, maxLength: 20, nullable: true),
                    LESSON_LEARNED_TEXT = table.Column<string>(type: "text", nullable: true),
                    LL_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    LL_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LESSON_LEARNED", x => x.LESSON_LEARNED_ID);
                    table.ForeignKey(
                        name: "FK_LESSONLEARNED_RELATIONS_PROJECT",
                        column: x => x.PROJECT_ID,
                        principalTable: "PROJECT",
                        principalColumn: "PROJECT_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_16_FK",
                table: "LESSON_LEARNED",
                column: "PROJECT_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LESSON_LEARNED");
        }
    }
}
