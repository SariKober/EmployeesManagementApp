using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectServer.Data.Migrations
{
    public partial class addroleemployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_RoleEmployees_EmployeeId",
                table: "RoleEmployees",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleEmployees_Employees_EmployeeId",
                table: "RoleEmployees",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Code",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoleEmployees_Roles_RoleId",
                table: "RoleEmployees",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleEmployees_Employees_EmployeeId",
                table: "RoleEmployees");

            migrationBuilder.DropForeignKey(
                name: "FK_RoleEmployees_Roles_RoleId",
                table: "RoleEmployees");

            migrationBuilder.DropIndex(
                name: "IX_RoleEmployees_EmployeeId",
                table: "RoleEmployees");
        }
    }
}
