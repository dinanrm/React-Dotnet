using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class ChangeDataType2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WORKING_CAPITAL",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 0)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TOTAL",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 0)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "PLANT_MACHINE",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 0)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "LAND_IMPROVEMENT",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 0)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "LAND_COMPENSATION",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 0)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "INFRASTRUCTURE",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 0)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EXPENSE_UNDER_DEVELOPMENT",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 0)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EQUIPMENT",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 0)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CONTINGENCY",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 0)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "BUILDING",
                table: "PROJECT",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18, 0)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "WORKING_CAPITAL",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "TOTAL",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "PLANT_MACHINE",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "LAND_IMPROVEMENT",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "LAND_COMPENSATION",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "INFRASTRUCTURE",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "EXPENSE_UNDER_DEVELOPMENT",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "EQUIPMENT",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "CONTINGENCY",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<decimal>(
                name: "BUILDING",
                table: "PROJECT",
                type: "decimal(18, 0)",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
