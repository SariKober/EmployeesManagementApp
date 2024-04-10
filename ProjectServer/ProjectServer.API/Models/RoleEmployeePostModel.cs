namespace ProjectServer.API.Models
{
    public class RoleEmployeePostModel
    {
        public int RoleId { get; set; }
        public int EmployeeId { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime DateOfEntry { get; set; }
        
    }
}
