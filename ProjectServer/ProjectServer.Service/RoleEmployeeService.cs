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
    public class RoleEmployeeService : IRoleEmployeeService
    {
        private readonly IRoleEmployeeRepository _roleEmployeeRepository;
        public RoleEmployeeService(IRoleEmployeeRepository roleEmployeeRepository)
        {
            _roleEmployeeRepository = roleEmployeeRepository;
        }
        public async Task<RoleEmployee> AddAsync(RoleEmployee roleEmployee)
        {
            return await _roleEmployeeRepository.AddAsync(roleEmployee);
        }

        public async Task DeleteEmployeeAsync(int employeeId)
        {
            await _roleEmployeeRepository.DeleteEmployeeAsync(employeeId);
        }

        public async Task DeleteAsync(int employeeId, int roleId)
        {
            await _roleEmployeeRepository.DeleteAsync(employeeId, roleId);
        }

        public async Task<IEnumerable<RoleEmployee>> GetByEmployeeIdAsync(int employeeId)
        {
            return await _roleEmployeeRepository.GetByEmployeeIdAsync(employeeId);
        }

        public async Task<IEnumerable<RoleEmployee>> GetByRoleIdAsync(int roleId)
        {
            return await _roleEmployeeRepository.GetByRoleIdAsync(roleId);
        }

        public async Task<RoleEmployee> GetByEmployeeIdRoleIdAsync(int employeeId, int roleId)
        {
            return await _roleEmployeeRepository.GetByEmployeeIdRoleIdAsync(employeeId, roleId);
        }

        public async Task<RoleEmployee> UpdateAsync(int employeeId, int roleId, RoleEmployee roleEmployee)
        {
            return await _roleEmployeeRepository.UpdateAsync(employeeId, roleId, roleEmployee);
        }
    }
}
