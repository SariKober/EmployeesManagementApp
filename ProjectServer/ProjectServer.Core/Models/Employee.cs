using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectServer.Core.Models
{
   public enum Gender
    {
        Male,
        Female
    }
    public class Employee
    {
        [Key]
        public int Code { get; set; }
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartOfWorkDate { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public bool Status { get; set; } = true;
    }
}
