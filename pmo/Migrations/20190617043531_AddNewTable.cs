using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddNewTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LESSON_LEARNED_USER",
                columns: table => new
                {
                    LLUSER_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    USER_ID = table.Column<int>(nullable: false),
                    LESSON_LEARNED_ID = table.Column<int>(nullable: false),
                    LLUSER_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    LLUSER_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LESSON_LEARNED_USER", x => new { x.LLUSER_ID, x.LESSON_LEARNED_ID, x.USER_ID });
                    table.ForeignKey(
                        name: "FK_LLUSER_HAS_RELATIONS_LL",
                        column: x => x.LESSON_LEARNED_ID,
                        principalTable: "LESSON_LEARNED",
                        principalColumn: "LESSON_LEARNED_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LLUSER_HAS_RELATIONS_USER",
                        column: x => x.USER_ID,
                        principalTable: "USER",
                        principalColumn: "USER_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_22_FK",
                table: "LESSON_LEARNED_USER",
                column: "LESSON_LEARNED_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_23_FK",
                table: "LESSON_LEARNED_USER",
                column: "USER_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LESSON_LEARNED_USER");
        }
    }
}
