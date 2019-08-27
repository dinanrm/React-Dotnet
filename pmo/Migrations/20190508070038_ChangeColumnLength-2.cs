using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class ChangeColumnLength2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DOC_TYPE",
                table: "DOCUMENT",
                unicode: false,
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldMaxLength: 15,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DOC_TYPE",
                table: "DOCUMENT",
                unicode: false,
                maxLength: 15,
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldMaxLength: 100,
                oldNullable: true);
        }
    }
}
