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
    public class RoleRepository:IRoleRepository
    {

        private readonly DataContext _dataContext;
        public RoleRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _dataContext.Roles.ToListAsync();
        }
        
        public async Task<Role> GetByIdAsync(int roleId)
        {
            return await _dataContext.Roles.FirstAsync(e => e.Id == roleId);
        }

        public async Task<IEnumerable<Role>> GetRolesNotAssignedToEmployeeAsync(int employeeId)
        {
            // קבל את כל התפקידים שאינם מוקשרים לעובד עם ה-id הנתון
            var rolesNotAssigned = await _dataContext.Roles
                .Where(role => !_dataContext.RoleEmployees.Any(er => er.EmployeeId == employeeId && er.RoleId == role.Id))
                .ToListAsync();
            var assignedRolesWithStatusFalse = await _dataContext.Roles
            .Where(role => _dataContext.RoleEmployees
             .Any(er => er.EmployeeId == employeeId && er.RoleId == role.Id && !er.Status))
         .ToListAsync();
            var result = rolesNotAssigned.Concat(assignedRolesWithStatusFalse);

            return result; ;
        }
        public async Task<Role> AddAsync(Role role)
        {
            _dataContext.Roles.Add(role);
            await _dataContext.SaveChangesAsync();
            return role;
        }
      
        public async Task DeleteAsync(int roleId)
        {
            var role = await GetByIdAsync(roleId);
            _dataContext.Roles.Remove(role);
            await _dataContext.SaveChangesAsync();
        }
    }
   
}
