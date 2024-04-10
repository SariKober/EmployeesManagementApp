using Microsoft.EntityFrameworkCore;
using ProjectServer.Core.Models;
using ProjectServer.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectServer.Data.Repositories
{
    public class RoleEmployeeRepository : IRoleEmployeeRepository
    {
        private readonly DataContext _dataContext;
        public RoleEmployeeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<RoleEmployee> AddAsync(RoleEmployee roleEmployee)
        {
            var ifEmployeeExist = await _dataContext.Employees.FirstAsync(x => x.Code == roleEmployee.EmployeeId);
            var ifRoleExist = await _dataContext.Roles.FirstAsync(x => x.Id == roleEmployee.RoleId);
            if (ifEmployeeExist == null || ifRoleExist == null)
            {
                return roleEmployee;    //עובד לא קיים או תפקיד לא קיים
            }
            var existRoleEmployee = await _dataContext.RoleEmployees.FirstOrDefaultAsync(er => er.EmployeeId == roleEmployee.EmployeeId && er.RoleId == roleEmployee.RoleId && !er.Status);
            if (existRoleEmployee != null)
            {
                return await UpdateAsync(roleEmployee.EmployeeId, roleEmployee.RoleId, roleEmployee);

            }
            _dataContext.RoleEmployees.Add(roleEmployee);
            await _dataContext.SaveChangesAsync();
            return roleEmployee;
        }

        public async Task DeleteEmployeeAsync(int employeeId)
        {
            var employeeRoles = await GetByEmployeeIdAsync(employeeId);
            _dataContext.RoleEmployees.RemoveRange(employeeRoles);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int employeeId, int roleId)
        {
            var employee = await GetByEmployeeIdRoleIdAsync(employeeId, roleId);
            employee.Status = false;
            await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<RoleEmployee>> GetByEmployeeIdAsync(int employeeId)
        {
            var roles = await _dataContext.RoleEmployees
                .Where(e => e.EmployeeId == employeeId && e.Status)
                .Include(p => p.Role)
                .Include(p2 => p2.Employee)
                .ToListAsync();

            return roles.Any() ? roles : null;
        }

        public async Task<IEnumerable<RoleEmployee>> GetByRoleIdAsync(int roleId)
        {
            return await _dataContext.RoleEmployees.Where(x => x.RoleId == roleId).ToListAsync();
        }

        public async Task<RoleEmployee> GetByEmployeeIdRoleIdAsync(int employeeId, int roleId)
        {
            return await _dataContext.RoleEmployees.FirstAsync(x => x.EmployeeId == employeeId && x.RoleId == roleId);
        }


        public async Task<RoleEmployee> UpdateAsync(int employeeId, int roleId, RoleEmployee roleEmployee)
        {
            roleEmployee.EmployeeId = employeeId;
            roleEmployee.RoleId = roleId;
            var existRoleEmployee = await GetByEmployeeIdRoleIdAsync(roleEmployee.EmployeeId, roleEmployee.RoleId);
            _dataContext.Entry(existRoleEmployee).CurrentValues.SetValues(roleEmployee);
            await _dataContext.SaveChangesAsync();
            return existRoleEmployee;
        }



    }
}
