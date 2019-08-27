using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class ChangeDataType3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "DOC_STATUS",
                table: "DOCUMENT",
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldMaxLength: 15,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DOC_STATUS",
                table: "DOCUMENT",
                unicode: false,
                maxLength: 15,
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
