using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class DeleteSomeTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PROJECT_RELATIONS_CLOSING",
                table: "PROJECT");

            migrationBuilder.DropForeignKey(
                name: "FK_PROJECT_RELATIONS_EXECUTE",
                table: "PROJECT");

            migrationBuilder.DropForeignKey(
                name: "FK_PROJECT_RELATIONS_INITIATI",
                table: "PROJECT");

            migrationBuilder.DropForeignKey(
                name: "FK_PROJECT_RELATIONS_PLAN",
                table: "PROJECT");

            migrationBuilder.DropTable(
                name: "CLOSING");

            migrationBuilder.DropTable(
                name: "EXECUTE");

            migrationBuilder.DropTable(
                name: "INITIATIVE");

            migrationBuilder.DropTable(
                name: "PLAN");

            migrationBuilder.DropIndex(
                name: "RELATIONSHIP_8_FK",
                table: "PROJECT");

            migrationBuilder.DropIndex(
                name: "RELATIONSHIP_10_FK",
                table: "PROJECT");

            migrationBuilder.DropIndex(
                name: "RELATIONSHIP_6_FK",
                table: "PROJECT");

            migrationBuilder.DropIndex(
                name: "RELATIONSHIP_12_FK",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "CLOSING_ID",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "EXECUTE_ID",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "INITIATIVE_ID",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "PLAN_ID",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "PROJECT_CATEGORY",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "PROJECT_TITLE",
                table: "PROJECT");

            migrationBuilder.RenameColumn(
                name: "PROJECT_DESCRIPTION",
                table: "PROJECT",
                newName: "VISION");

            migrationBuilder.AddColumn<string>(
                name: "ACKNOWLEDGED_BY",
                table: "PROJECT",
                unicode: false,
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AGREED_BY",
                table: "PROJECT",
                unicode: false,
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BACKGROUND_INFORMATION",
                table: "PROJECT",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "BUILDING",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "CONTINGENCY",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EQUIPMENT",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EXECUTIVE_SUMMARY",
                table: "PROJECT",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EXPENSE_UNDER_DEVELOPMENT",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "INFRASTRUCTURE",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "INITIATIVE_TITLE",
                table: "PROJECT",
                unicode: false,
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "LAND_COMPENSATION",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "LAND_IMPROVEMENT",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OBJECTIVE",
                table: "PROJECT",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OBJECTIVE_BENEFIT",
                table: "PROJECT",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "PLANT_MACHINE",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PREPARED_DATE",
                table: "PROJECT",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PROJECT_DEFINITION",
                table: "PROJECT",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "REQUESTED_BY",
                table: "PROJECT",
                unicode: false,
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TIMELINE",
                table: "PROJECT",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TOTAL",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "WORKING_CAPITAL",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ACKNOWLEDGED_BY",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "AGREED_BY",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "BACKGROUND_INFORMATION",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "BUILDING",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "CONTINGENCY",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "EQUIPMENT",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "EXECUTIVE_SUMMARY",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "EXPENSE_UNDER_DEVELOPMENT",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "INFRASTRUCTURE",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "INITIATIVE_TITLE",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "LAND_COMPENSATION",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "LAND_IMPROVEMENT",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "OBJECTIVE",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "OBJECTIVE_BENEFIT",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "PLANT_MACHINE",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "PREPARED_DATE",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "PROJECT_DEFINITION",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "REQUESTED_BY",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "TIMELINE",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "TOTAL",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "WORKING_CAPITAL",
                table: "PROJECT");

            migrationBuilder.RenameColumn(
                name: "VISION",
                table: "PROJECT",
                newName: "PROJECT_DESCRIPTION");

            migrationBuilder.AddColumn<int>(
                name: "CLOSING_ID",
                table: "PROJECT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EXECUTE_ID",
                table: "PROJECT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "INITIATIVE_ID",
                table: "PROJECT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PLAN_ID",
                table: "PROJECT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PROJECT_CATEGORY",
                table: "PROJECT",
                unicode: false,
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PROJECT_TITLE",
                table: "PROJECT",
                unicode: false,
                maxLength: 30,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CLOSING",
                columns: table => new
                {
                    CLOSING_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CLOSING_LESSON_LEARNED = table.Column<string>(type: "text", nullable: true),
                    PROJECT_ID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CLOSING", x => x.CLOSING_ID);
                    table.ForeignKey(
                        name: "FK_CLOSING_RELATIONS_PROJECT",
                        column: x => x.PROJECT_ID,
                        principalTable: "PROJECT",
                        principalColumn: "PROJECT_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EXECUTE",
                columns: table => new
                {
                    EXECUTE_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EXECUTE_LESSON_LEARNED = table.Column<string>(type: "text", nullable: true),
                    PROJECT_ID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EXECUTE", x => x.EXECUTE_ID);
                    table.ForeignKey(
                        name: "FK_EXECUTE_RELATIONS_PROJECT",
                        column: x => x.PROJECT_ID,
                        principalTable: "PROJECT",
                        principalColumn: "PROJECT_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "INITIATIVE",
                columns: table => new
                {
                    INITIATIVE_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ACKNOWLEDGED_BY = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    AGREED_BY = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    BACKGROUND_INFORMATION = table.Column<string>(type: "text", nullable: true),
                    BUILDING = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    CONTINGENCY = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    EQUIPMENT = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    EXECUTIVE_SUMMARY = table.Column<string>(type: "text", nullable: true),
                    EXPENSE_UNDER_DEVELOPMENT = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    INFRASTRUCTURE = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    INITIATIVE_LESSON_LEARNED = table.Column<string>(type: "text", nullable: true),
                    INITIATIVE_TITLE = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    LAND_COMPENSATION = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    LAND_IMPROVEMENT = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    OBJECTIVE = table.Column<string>(type: "text", nullable: true),
                    OBJECTIVE_BENEFIT = table.Column<string>(type: "text", nullable: true),
                    PLANT_MACHINE = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    PREPARED_DATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    PROJECT_DEFINITION = table.Column<string>(type: "text", nullable: true),
                    PROJECT_ID = table.Column<int>(nullable: true),
                    REQUESTED_BY = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    TIMELINE = table.Column<string>(type: "text", nullable: true),
                    TOTAL = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    VISION = table.Column<string>(type: "text", nullable: true),
                    WORKING_CAPITAL = table.Column<decimal>(type: "decimal(18, 0)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_INITIATIVE", x => x.INITIATIVE_ID);
                    table.ForeignKey(
                        name: "FK_INITIATI_RELATIONS_PROJECT",
                        column: x => x.PROJECT_ID,
                        principalTable: "PROJECT",
                        principalColumn: "PROJECT_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PLAN",
                columns: table => new
                {
                    PLAN_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PLAN_LESSON_LEARNED = table.Column<string>(type: "text", nullable: true),
                    PROJECT_ID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PLAN", x => x.PLAN_ID);
                    table.ForeignKey(
                        name: "FK_PLAN_RELATIONS_PROJECT",
                        column: x => x.PROJECT_ID,
                        principalTable: "PROJECT",
                        principalColumn: "PROJECT_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_8_FK",
                table: "PROJECT",
                column: "CLOSING_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_10_FK",
                table: "PROJECT",
                column: "EXECUTE_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_6_FK",
                table: "PROJECT",
                column: "INITIATIVE_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_12_FK",
                table: "PROJECT",
                column: "PLAN_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_9_FK",
                table: "CLOSING",
                column: "PROJECT_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_11_FK",
                table: "EXECUTE",
                column: "PROJECT_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_7_FK",
                table: "INITIATIVE",
                column: "PROJECT_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_13_FK",
                table: "PLAN",
                column: "PROJECT_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_PROJECT_RELATIONS_CLOSING",
                table: "PROJECT",
                column: "CLOSING_ID",
                principalTable: "CLOSING",
                principalColumn: "CLOSING_ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PROJECT_RELATIONS_EXECUTE",
                table: "PROJECT",
                column: "EXECUTE_ID",
                principalTable: "EXECUTE",
                principalColumn: "EXECUTE_ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PROJECT_RELATIONS_INITIATI",
                table: "PROJECT",
                column: "INITIATIVE_ID",
                principalTable: "INITIATIVE",
                principalColumn: "INITIATIVE_ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PROJECT_RELATIONS_PLAN",
                table: "PROJECT",
                column: "PLAN_ID",
                principalTable: "PLAN",
                principalColumn: "PLAN_ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
