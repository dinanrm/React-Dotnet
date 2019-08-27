using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddHistoryTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HISTORY",
                columns: table => new
                {
                    HISTORY_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PROJECT_ID = table.Column<int>(nullable: true),
                    USER_ID = table.Column<int>(nullable: true),
                    HISTORY_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    STATUS_BEFORE = table.Column<int>(nullable: true),
                    STATUS_AFTER = table.Column<int>(nullable: true),
                    COMMENT = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HISTORY", x => x.HISTORY_ID);
                    table.ForeignKey(
                        name: "FK_HISTORY_RELATIONS_PROJECT",
                        column: x => x.PROJECT_ID,
                        principalTable: "PROJECT",
                        principalColumn: "PROJECT_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HISTORY_RELATIONS_USER",
                        column: x => x.USER_ID,
                        principalTable: "USER",
                        principalColumn: "USER_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_17_FK",
                table: "HISTORY",
                column: "PROJECT_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_18_FK",
                table: "HISTORY",
                column: "USER_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HISTORY");
        }
    }
}
