using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProjectServer.API.Models;
using ProjectServer.Core.DTOs;
using ProjectServer.Core.Models;
using ProjectServer.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }
        // GET: api/<RoleController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var roles = await _roleService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<RoleDto>>(roles));
        }


        [HttpGet("{employeeId}")]
        //מחזיר את כל העבודות שעובד מסוים אינו עובד בהם
        public async Task<ActionResult> GetRolesNotAssignedToEmployee(int employeeId)
        {
            var role = await _roleService.GetRolesNotAssignedToEmployeeAsync(employeeId);
            return Ok(_mapper.Map<IEnumerable<RoleDto>>(role));
        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RolePostModel model)
        {
            var newRole = await _roleService.AddAsync(_mapper.Map<Role>(model));
            return Ok(_mapper.Map<RoleDto>(newRole));
        }
     
        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role is null)
            {
                return NotFound();
            }
            await _roleService.DeleteAsync(id);
            return NoContent();
        }
    }
}
