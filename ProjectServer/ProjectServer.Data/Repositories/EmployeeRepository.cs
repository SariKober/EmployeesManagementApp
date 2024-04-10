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
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _dataContext;
        public EmployeeRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _dataContext.Employees.Where(e => e.Status).ToListAsync();
        }
        public async Task<Employee> GetByIdAsync(int employeeId)
        {
            return await _dataContext.Employees.FirstAsync(e => e.Code == employeeId);
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            _dataContext.Employees.Add(employee);
            await _dataContext.SaveChangesAsync();
            return employee;
        }
        public async Task<Employee> UpdateAsync(Employee employee)
        {
            var existEmployee = await GetByIdAsync(employee.Code);
            _dataContext.Entry(existEmployee).CurrentValues.SetValues(employee);
            await _dataContext.SaveChangesAsync();
            return existEmployee;
        }
        public async Task DeleteAsync(int employeeId)
        {
            var existEmployee = await GetByIdAsync(employeeId);
            existEmployee.Status = false;
            await _dataContext.SaveChangesAsync();
        }

    }
}
