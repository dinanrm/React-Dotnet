using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddSomeColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DOC_SIZE",
                table: "DOCUMENT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DOC_TYPE",
                table: "DOCUMENT",
                unicode: false,
                maxLength: 15,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DOC_SIZE",
                table: "DOCUMENT");

            migrationBuilder.DropColumn(
                name: "DOC_TYPE",
                table: "DOCUMENT");
        }
    }
}
