using ProjectServer.Core.Models;

namespace ProjectServer.API.Models
{
    public class EmployeePostModel
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartOfWorkDate { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
    
    }
}
