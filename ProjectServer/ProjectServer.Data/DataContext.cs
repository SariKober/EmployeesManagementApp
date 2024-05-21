using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ProjectServer.Core.Models;
using ProjectServer.Core.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectServer.Data
{
    public class DataContext :DbContext
    {
        private readonly IConfiguration _configuration;

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleEmployee> RoleEmployees { get; set; }

        public DataContext(IConfiguration configuration)
        {
            this._configuration = configuration;  
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(this._configuration.GetConnectionString("cloudDB"));
            //optionsBuilder.UseSqlServer(this._configuration.GetConnectionString("workersDB"));
            optionsBuilder.LogTo((message) => Debug.Write(message));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoleEmployee>()
                .HasKey(re => new { re.RoleId, re.EmployeeId });
        }

    }
}
