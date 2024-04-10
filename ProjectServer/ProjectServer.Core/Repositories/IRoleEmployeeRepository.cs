using ProjectServer.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectServer.Core.Repositories
{
    public interface IRoleEmployeeRepository
    {
        Task<IEnumerable<RoleEmployee>> GetByEmployeeIdAsync(int employeeId);
        Task<IEnumerable<RoleEmployee>> GetByRoleIdAsync(int roleId);
        Task<RoleEmployee> GetByEmployeeIdRoleIdAsync(int employeeId, int roleId);
        Task<RoleEmployee> AddAsync(RoleEmployee roleEmployee);
        Task<RoleEmployee> UpdateAsync(int employeeId, int roleId, RoleEmployee roleEmployee);
        Task DeleteEmployeeAsync(int employeeId);
        Task DeleteAsync(int employeeId,int roleId);
    }
}
