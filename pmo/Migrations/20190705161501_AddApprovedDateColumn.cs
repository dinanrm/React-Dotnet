using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace pmo.Migrations
{
    public partial class AddApprovedDateColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DATE_RAISE",
                table: "CHANGE_REQUEST",
                newName: "RAISED_DATE");

            migrationBuilder.RenameColumn(
                name: "APPROVAL_DATE",
                table: "CHANGE_REQUEST",
                newName: "APPROVED_DATE");

            migrationBuilder.AddColumn<DateTime>(
                name: "APPROVAL_REQ_DATE",
                table: "CHANGE_REQUEST",
                type: "date",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "APPROVAL_REQ_DATE",
                table: "CHANGE_REQUEST");

            migrationBuilder.RenameColumn(
                name: "RAISED_DATE",
                table: "CHANGE_REQUEST",
                newName: "DATE_RAISE");

            migrationBuilder.RenameColumn(
                name: "APPROVED_DATE",
                table: "CHANGE_REQUEST",
                newName: "APPROVAL_DATE");
        }
    }
}
