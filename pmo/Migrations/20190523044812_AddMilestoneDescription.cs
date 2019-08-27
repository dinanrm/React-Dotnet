using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddMilestoneDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MILESTONE_DESCRIPTION",
                table: "MILESTONE",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MILESTONE_DESCRIPTION",
                table: "MILESTONE");
        }
    }
}
