using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddMilestoneRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ESTIMATED_END_TIME",
                table: "MILESTONE",
                newName: "COMPLETED_TIME");

            migrationBuilder.AddColumn<int>(
                name: "ProjectCategoryId",
                table: "MILESTONE",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "RELATIONSHIP_28_FK",
                table: "MILESTONE",
                column: "ProjectCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_MILESTONE_RELATIONS_PROJECT_CATEGORY",
                table: "MILESTONE",
                column: "ProjectCategoryId",
                principalTable: "PROJECT_CATEGORY",
                principalColumn: "PROJECT_CATEGORY_ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MILESTONE_RELATIONS_PROJECT_CATEGORY",
                table: "MILESTONE");

            migrationBuilder.DropIndex(
                name: "RELATIONSHIP_28_FK",
                table: "MILESTONE");

            migrationBuilder.DropColumn(
                name: "ProjectCategoryId",
                table: "MILESTONE");

            migrationBuilder.RenameColumn(
                name: "COMPLETED_TIME",
                table: "MILESTONE",
                newName: "ESTIMATED_END_TIME");
        }
    }
}
