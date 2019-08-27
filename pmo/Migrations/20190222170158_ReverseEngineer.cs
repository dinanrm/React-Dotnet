using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class ReverseEngineer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CATEGORY",
                columns: table => new
                {
                    CATEGORY_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CATEGORY_NAME = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    CATEGORY_DESCRIPTION = table.Column<string>(type: "text", nullable: true),
                    FILE_STREAM = table.Column<byte[]>(nullable: true),
                    CATEGORY_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    CATEGORY_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CATEGORY", x => x.CATEGORY_ID);
                });

            migrationBuilder.CreateTable(
                name: "PERMISSION",
                columns: table => new
                {
                    PERMISSION_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PERMISSION_NAME = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    PERMISSION_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    PERMISSION_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PERMISSION", x => x.PERMISSION_ID);
                });

            migrationBuilder.CreateTable(
                name: "ROLE",
                columns: table => new
                {
                    ROLE_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ROLE_NAME = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    ROLE_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    ROLE_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ROLE", x => x.ROLE_ID);
                });

            migrationBuilder.CreateTable(
                name: "USER",
                columns: table => new
                {
                    USER_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    USER_NAME = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    USER_EMAIL = table.Column<string>(unicode: false, maxLength: 20, nullable: true),
                    USER_PASSWORD = table.Column<string>(unicode: false, maxLength: 15, nullable: true),
                    USER_STATUS = table.Column<string>(unicode: false, maxLength: 15, nullable: true),
                    USER_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    USER_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USER", x => x.USER_ID);
                });

            migrationBuilder.CreateTable(
                name: "ROLE_HAS_PERMISSION",
                columns: table => new
                {
                    RHP_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ROLE_ID = table.Column<int>(nullable: false),
                    PERMISSION_ID = table.Column<int>(nullable: false),
                    RHP_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    RHP_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ROLE_HAS_PERMISSION", x => new { x.RHP_ID, x.ROLE_ID, x.PERMISSION_ID });
                    table.ForeignKey(
                        name: "FK_ROLE_HAS_RELATIONS_PERMISSI",
                        column: x => x.PERMISSION_ID,
                        principalTable: "PERMISSION",
                        principalColumn: "PERMISSION_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ROLE_HAS_RELATIONS_ROLE",
                        column: x => x.ROLE_ID,
                        principalTable: "ROLE",
                        principalColumn: "ROLE_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DOCUMENT",
                columns: table => new
                {
                    DOC_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PROJECT_ID = table.Column<int>(nullable: true),
                    CATEGORY_ID = table.Column<int>(nullable: true),
                    DOC_NAME = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    DOC_DESCRIPTION = table.Column<string>(type: "text", nullable: true),
                    DOC_STATUS = table.Column<string>(unicode: false, maxLength: 15, nullable: true),
                    DOC_STREAM = table.Column<byte[]>(nullable: true),
                    DOC_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    DOC_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DOCUMENT", x => x.DOC_ID);
                    table.ForeignKey(
                        name: "FK_DOCUMENT_RELATIONS_CATEGORY",
                        column: x => x.CATEGORY_ID,
                        principalTable: "CATEGORY",
                        principalColumn: "CATEGORY_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PROJECT",
                columns: table => new
                {
                    PROJECT_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    INITIATIVE_ID = table.Column<int>(nullable: true),
                    EXECUTE_ID = table.Column<int>(nullable: true),
                    CLOSING_ID = table.Column<int>(nullable: true),
                    PLAN_ID = table.Column<int>(nullable: true),
                    PROJECT_TITLE = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    PROJECT_CATEGORY = table.Column<string>(unicode: false, maxLength: 10, nullable: true),
                    PROJECT_DESCRIPTION = table.Column<string>(type: "text", nullable: true),
                    PROJECT_STATUS = table.Column<string>(unicode: false, maxLength: 15, nullable: true),
                    PROJECT_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    PROJECT_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PROJECT", x => x.PROJECT_ID);
                });

            migrationBuilder.CreateTable(
                name: "ASSIGN",
                columns: table => new
                {
                    ASSIGN_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    USER_ID = table.Column<int>(nullable: true),
                    ROLE_ID = table.Column<int>(nullable: true),
                    PROJECT_ID = table.Column<int>(nullable: true),
                    ASSIGN_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    ASSIGN_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ASSIGN", x => x.ASSIGN_ID);
                    table.ForeignKey(
                        name: "FK_ASSIGN_RELATIONS_PROJECT",
                        column: x => x.PROJECT_ID,
                        principalTable: "PROJECT",
                        principalColumn: "PROJECT_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ASSIGN_RELATIONS_ROLE",
                        column: x => x.ROLE_ID,
                        principalTable: "ROLE",
                        principalColumn: "ROLE_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ASSIGN_RELATIONS_USER",
                        column: x => x.USER_ID,
                        principalTable: "USER",
                        principalColumn: "USER_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CLOSING",
                columns: table => new
                {
                    CLOSING_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PROJECT_ID = table.Column<int>(nullable: true),
                    CLOSING_LESSON_LEARNED = table.Column<string>(type: "text", nullable: true)
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
                    PROJECT_ID = table.Column<int>(nullable: true),
                    EXECUTE_LESSON_LEARNED = table.Column<string>(type: "text", nullable: true)
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
                    PROJECT_ID = table.Column<int>(nullable: true),
                    INITIATIVE_TITLE = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    PREPARED_DATE = table.Column<DateTime>(type: "datetime", nullable: true),
                    BACKGROUND_INFORMATION = table.Column<string>(type: "text", nullable: true),
                    OBJECTIVE_BENEFIT = table.Column<string>(type: "text", nullable: true),
                    LAND_COMPENSATION = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    LAND_IMPROVEMENT = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    BUILDING = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    INFRASTRUCTURE = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    PLANT_MACHINE = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    EQUIPMENT = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    EXPENSE_UNDER_DEVELOPMENT = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    WORKING_CAPITAL = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    CONTINGENCY = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    TOTAL = table.Column<decimal>(type: "decimal(18, 0)", nullable: true),
                    TIMELINE = table.Column<string>(type: "text", nullable: true),
                    REQUESTED_BY = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    ACKNOWLEDGED_BY = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    AGREED_BY = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    EXECUTIVE_SUMMARY = table.Column<string>(type: "text", nullable: true),
                    PROJECT_DEFINITION = table.Column<string>(type: "text", nullable: true),
                    VISION = table.Column<string>(type: "text", nullable: true),
                    OBJECTIVE = table.Column<string>(type: "text", nullable: true),
                    INITIATIVE_LESSON_LEARNED = table.Column<string>(type: "text", nullable: true)
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
                    PROJECT_ID = table.Column<int>(nullable: true),
                    PLAN_LESSON_LEARNED = table.Column<string>(type: "text", nullable: true)
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
                name: "RELATIONSHIP_1_FK",
                table: "ASSIGN",
                column: "PROJECT_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_2_FK",
                table: "ASSIGN",
                column: "ROLE_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_3_FK",
                table: "ASSIGN",
                column: "USER_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_9_FK",
                table: "CLOSING",
                column: "PROJECT_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_15_FK",
                table: "DOCUMENT",
                column: "CATEGORY_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_14_FK",
                table: "DOCUMENT",
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
                name: "RELATIONSHIP_5_FK",
                table: "ROLE_HAS_PERMISSION",
                column: "PERMISSION_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_4_FK",
                table: "ROLE_HAS_PERMISSION",
                column: "ROLE_ID");

            migrationBuilder.AddForeignKey(
                name: "FK_DOCUMENT_RELATIONS_PROJECT",
                table: "DOCUMENT",
                column: "PROJECT_ID",
                principalTable: "PROJECT",
                principalColumn: "PROJECT_ID",
                onDelete: ReferentialAction.Restrict);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CLOSING_RELATIONS_PROJECT",
                table: "CLOSING");

            migrationBuilder.DropForeignKey(
                name: "FK_EXECUTE_RELATIONS_PROJECT",
                table: "EXECUTE");

            migrationBuilder.DropForeignKey(
                name: "FK_INITIATI_RELATIONS_PROJECT",
                table: "INITIATIVE");

            migrationBuilder.DropForeignKey(
                name: "FK_PLAN_RELATIONS_PROJECT",
                table: "PLAN");

            migrationBuilder.DropTable(
                name: "ASSIGN");

            migrationBuilder.DropTable(
                name: "DOCUMENT");

            migrationBuilder.DropTable(
                name: "ROLE_HAS_PERMISSION");

            migrationBuilder.DropTable(
                name: "USER");

            migrationBuilder.DropTable(
                name: "CATEGORY");

            migrationBuilder.DropTable(
                name: "PERMISSION");

            migrationBuilder.DropTable(
                name: "ROLE");

            migrationBuilder.DropTable(
                name: "PROJECT");

            migrationBuilder.DropTable(
                name: "CLOSING");

            migrationBuilder.DropTable(
                name: "EXECUTE");

            migrationBuilder.DropTable(
                name: "INITIATIVE");

            migrationBuilder.DropTable(
                name: "PLAN");
        }
    }
}
