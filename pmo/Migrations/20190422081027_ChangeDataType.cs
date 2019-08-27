using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class ChangeDataType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "REQUESTED_BY",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AGREED_BY",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldMaxLength: 50,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ACKNOWLEDGED_BY",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(string),
                oldUnicode: false,
                oldMaxLength: 50,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "REQUESTED_BY",
                table: "PROJECT",
                unicode: false,
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "AGREED_BY",
                table: "PROJECT",
                unicode: false,
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "ACKNOWLEDGED_BY",
                table: "PROJECT",
                unicode: false,
                maxLength: 50,
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
