using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectServer.Core.Models
{
    public class RoleEmployee
    {
        [Key]
        public int RoleId { get; set; }
        [Key]
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public Role Role { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime DateOfEntry { get; set; }
        public bool Status { get; set; } = true;


    }
}
