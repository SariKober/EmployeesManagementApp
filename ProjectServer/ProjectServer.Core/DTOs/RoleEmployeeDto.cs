using ProjectServer.Core.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectServer.Core.DTOs
{
    public class RoleEmployeeDto
    {
        public int RoleId { get; set; }
        public int EmployeeId { get; set; }
        public EmployeeDto Employee { get; set; }
        public RoleDto Role { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime DateOfEntry { get; set; }
    }
}
