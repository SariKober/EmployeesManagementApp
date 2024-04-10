using ProjectServer.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectServer.Core.Services
{
    public interface IRoleEmployeeService
    {
        Task<RoleEmployee> GetByEmployeeIdRoleIdAsync(int employeeId, int roleId);
        Task<IEnumerable<RoleEmployee>> GetByRoleIdAsync(int roleId);
        Task<IEnumerable<RoleEmployee>> GetByEmployeeIdAsync(int EmployeeId);

        Task<RoleEmployee> AddAsync(RoleEmployee roleEmployee);

        Task<RoleEmployee> UpdateAsync(int employeeId, int roleId, RoleEmployee roleEmployee);

        Task DeleteEmployeeAsync(int employeeId);
        Task DeleteAsync(int employeeId,int  roleId);
    }
}
