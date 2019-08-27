using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddPlanningAttributes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PROJECT_MANAGEMENT_PLAN",
                table: "PROJECT",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EXECUTIVE_SUMMARY_OF_PROJECT_INITIATIVE",
                table: "PROJECT",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ASSUMPTION",
                table: "PROJECT",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CHANGE_CONTROL_MANAGEMENT",
                table: "PROJECT",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PROJECT_MANAGEMENT_PLAN",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "EXECUTIVE_SUMMARY_OF_PROJECT_INITIATIVE",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "ASSUMPTION",
                table: "PROJECT");

            migrationBuilder.DropColumn(
                name: "CHANGE_CONTROL_MANAGEMENT",
                table: "PROJECT");
        }
    }
}
