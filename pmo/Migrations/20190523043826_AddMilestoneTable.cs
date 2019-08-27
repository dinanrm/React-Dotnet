using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddMilestoneTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MILESTONE",
                columns: table => new
                {
                    MILESTONE_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PROJECT_ID = table.Column<int>(nullable: true),
                    ESTIMATED_START_TIME = table.Column<DateTime>(type: "datetime", nullable: true),
                    ESTIMATED_END_TIME = table.Column<DateTime>(type: "datetime", nullable: true),
                    MILESTONE_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    MILESTONE_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MILESTONE", x => x.MILESTONE_ID);
                    table.ForeignKey(
                        name: "FK_MILESTONE_RELATIONS_PROJECT",
                        column: x => x.PROJECT_ID,
                        principalTable: "PROJECT",
                        principalColumn: "PROJECT_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_19_FK",
                table: "MILESTONE",
                column: "PROJECT_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MILESTONE");
        }
    }
}
