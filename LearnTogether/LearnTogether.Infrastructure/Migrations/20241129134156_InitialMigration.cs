using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LearnTogether.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Datecreated",
                table: "Posts",
                newName: "DateCreated");

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Users",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    SubscribedToUserId = table.Column<Guid>(type: "uuid", nullable: true),
                    SubscribedToSubjectId = table.Column<int>(type: "integer", nullable: true),
                    NotificationMethod = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "DateCreated",
                table: "Posts",
                newName: "Datecreated");
        }
    }
}
