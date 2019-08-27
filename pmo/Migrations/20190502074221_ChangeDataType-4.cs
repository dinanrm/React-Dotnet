using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class ChangeDataType4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "REQUESTED_BY",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "AGREED_BY",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ACKNOWLEDGED_BY",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "REQUESTED_BY",
                table: "PROJECT",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AGREED_BY",
                table: "PROJECT",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ACKNOWLEDGED_BY",
                table: "PROJECT",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
