using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ProjectServer.API.Models;
using ProjectServer.Core.DTOs;
using ProjectServer.Core.Models;
using ProjectServer.Core.Services;
using ProjectServer.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectServer.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employees = await _employeeService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel model)
        {
            var newEmployee = await _employeeService.AddAsync(_mapper.Map<Employee>(model));
            return Ok(_mapper.Map<EmployeeDto>(newEmployee));
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel model)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            _mapper.Map(model, employee);
            await _employeeService.UpdateAsync(employee);
            employee = await _employeeService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            await _employeeService.DeleteAsync(id);
            return NoContent();
        }
    }
}


