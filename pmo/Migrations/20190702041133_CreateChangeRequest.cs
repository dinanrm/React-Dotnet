using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class CreateChangeRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CHANGE_REQUEST",
                columns: table => new
                {
                    CHANGE_REQUEST_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PROJECT_ID = table.Column<int>(nullable: true),
                    USER_ID = table.Column<int>(nullable: true),
                    CUSTOM_ID = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    CHANGE_REQUEST_NAME = table.Column<string>(unicode: false, maxLength: 50, nullable: true),
                    REQUESTER = table.Column<string>(unicode: false, maxLength: 30, nullable: true),
                    DATE_RAISE = table.Column<DateTime>(type: "date", nullable: true),
                    APPROVAL_DATE = table.Column<DateTime>(type: "date", nullable: true),
                    STATUS = table.Column<int>(nullable: true),
                    CR_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    CR_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CHANGE_REQUEST", x => x.CHANGE_REQUEST_ID);
                    table.ForeignKey(
                        name: "FK_CR_RELATIONS_PROJECT",
                        column: x => x.PROJECT_ID,
                        principalTable: "PROJECT",
                        principalColumn: "PROJECT_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CR_RELATIONS_USER",
                        column: x => x.USER_ID,
                        principalTable: "USER",
                        principalColumn: "USER_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CHANGE_REQUEST_CATEGORY",
                columns: table => new
                {
                    CR_CATEGORY_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CR_CATEGORY_NAME = table.Column<string>(unicode: false, maxLength: 20, nullable: true),
                    CR_CATEGORY_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    CR_CATEGORY_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CHANGE_REQUEST_CATEGORY", x => x.CR_CATEGORY_ID);
                });

            migrationBuilder.CreateTable(
                name: "CHANGE_REQUEST_DATA",
                columns: table => new
                {
                    CR_DATA_ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CHANGE_REQUEST_ID = table.Column<int>(nullable: true),
                    CR_CATEGORY_ID = table.Column<int>(nullable: true),
                    TITLE = table.Column<string>(nullable: true),
                    DESCRIPTION = table.Column<string>(nullable: true),
                    CR_DATA_CREATED_DATE = table.Column<DateTime>(type: "datetime", nullable: false),
                    CR_DATA_MODIFIED_DATE = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CHANGE_REQUEST_DATA", x => x.CR_DATA_ID);
                    table.ForeignKey(
                        name: "FK_CRDATA_RELATIONS_CRC",
                        column: x => x.CR_CATEGORY_ID,
                        principalTable: "CHANGE_REQUEST_CATEGORY",
                        principalColumn: "CR_CATEGORY_ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CRDATA_RELATIONS_CR",
                        column: x => x.CHANGE_REQUEST_ID,
                        principalTable: "CHANGE_REQUEST",
                        principalColumn: "CHANGE_REQUEST_ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_24_FK",
                table: "CHANGE_REQUEST",
                column: "PROJECT_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_25_FK",
                table: "CHANGE_REQUEST",
                column: "USER_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_27_FK",
                table: "CHANGE_REQUEST_DATA",
                column: "CR_CATEGORY_ID");

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_26_FK",
                table: "CHANGE_REQUEST_DATA",
                column: "CHANGE_REQUEST_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CHANGE_REQUEST_DATA");

            migrationBuilder.DropTable(
                name: "CHANGE_REQUEST_CATEGORY");

            migrationBuilder.DropTable(
                name: "CHANGE_REQUEST");
        }
    }
}
