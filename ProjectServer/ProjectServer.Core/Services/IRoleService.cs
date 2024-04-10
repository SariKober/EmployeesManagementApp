using ProjectServer.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectServer.Core.Services
{
    public interface IRoleService
    {
        Task<IEnumerable<Role>> GetAllAsync();
        Task<IEnumerable<Role>> GetRolesNotAssignedToEmployeeAsync(int employeeId);

        Task<Role> GetByIdAsync(int roleId);


        Task<Role> AddAsync(Role role);

        Task<Role> UpdateAsync(Role role);

        Task DeleteAsync(int roleId);
    }
}
