using ProjectServer.Core.Models;
using ProjectServer.Core.Repositories;
using ProjectServer.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectServer.Service
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        public async Task<Role> AddAsync(Role role)
        {
            var existingRoles = await _roleRepository.GetAllAsync();
            if (existingRoles.Any(x => x.Id == role.Id || x.Name == role.Name))
            {
                return null;
            }
            return await _roleRepository.AddAsync(role);
        }

        public async Task DeleteAsync(int roleId)
        {
            await _roleRepository.DeleteAsync(roleId);
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            return await _roleRepository.GetAllAsync();
        }
        public async Task<IEnumerable<Role>> GetRolesNotAssignedToEmployeeAsync(int employeeId)
        {
            return await _roleRepository.GetRolesNotAssignedToEmployeeAsync(employeeId);
        }

        public async Task<Role> GetByIdAsync(int roleId)
        {
            return await _roleRepository.GetByIdAsync(roleId);
        }

        

    }
}
