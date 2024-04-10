using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProjectServer.API.Models;
using ProjectServer.Core.DTOs;
using ProjectServer.Core.Models;
using ProjectServer.Core.Services;

//For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleEmployeeController : ControllerBase
    {
        private readonly IRoleEmployeeService _roleEmployeeService;
        private readonly IMapper _mapper;
        public RoleEmployeeController(IRoleEmployeeService roleEmployeeService, IMapper mapper)
        {
            _roleEmployeeService = roleEmployeeService;
            _mapper = mapper;
        }
        [HttpGet("{employeeId}/{roleId}")]//// GET api/<RoleEmployeeController>/5/5///שליפת תפקיד מסוים
        public async Task<ActionResult> GetByEmployeeIdRoleId(int employeeId, int roleId)
        {
            var roleEmployee = await _roleEmployeeService.GetByEmployeeIdRoleIdAsync(employeeId, roleId);
            return Ok(_mapper.Map<RoleEmployeeDto>(roleEmployee));
        }

        // GET api/<RoleEmployeeController>/5///שליפה לפי עובד
        [HttpGet("{employeeId}")]
        public async Task<ActionResult> GetByEmployeeId(int employeeId)
        {
            var roleEmployee = await _roleEmployeeService.GetByEmployeeIdAsync(employeeId);
            return Ok(_mapper.Map<IEnumerable<RoleEmployeeDto>>(roleEmployee));
        }



        // POST api/<RoleEmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RoleEmployeePostModel model)
        {
            var newEmployeeRole = await _roleEmployeeService.AddAsync(_mapper.Map<RoleEmployee>(model));
            return Ok(_mapper.Map<RoleEmployeeDto>(newEmployeeRole));
        }

        // PUT api/<RoleEmployeeController>/5
        [HttpPut("{employeeId}/{roleId}")]

        public async Task<ActionResult> Put(int employeeId, int roleId, [FromBody] RoleEmployeePostModel model)
        {

            var employeeRole = await _roleEmployeeService.GetByEmployeeIdRoleIdAsync(employeeId, roleId);
            if (employeeRole is null)
            {
                return NotFound();
            }
            _mapper.Map(model, employeeRole);
            await _roleEmployeeService.UpdateAsync(employeeId, roleId, employeeRole);
            employeeRole = await _roleEmployeeService.GetByEmployeeIdRoleIdAsync(employeeId, roleId);
            return Ok(_mapper.Map<RoleEmployeeDto>(employeeRole));

        }

        // DELETE api/<RoleEmployeeController>/5///מחיקת כל תפקידי העובד
        [HttpDelete("{idE}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var employeeRole = await _roleEmployeeService.GetByEmployeeIdAsync(id);
            if (employeeRole is null)
            {
                return NotFound();
            }
            await _roleEmployeeService.DeleteEmployeeAsync(id);
            return NoContent();
        }

        // DELETE api/<RoleEmployeeController>/5///מחיקת תפקיד מסוים
        [HttpDelete("{employeeId}/{roleId}")]
        public async Task<ActionResult> Delete(int employeeId, int roleId)
        {
            var employeeRole = await _roleEmployeeService.GetByEmployeeIdRoleIdAsync(employeeId, roleId);
            if (employeeRole is null)
            {
                return NotFound();
            }
            await _roleEmployeeService.DeleteAsync(employeeId, roleId);
            return NoContent();
        }
    }
}
