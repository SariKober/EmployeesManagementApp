using AutoMapper;
using ProjectServer.Core.DTOs;
using ProjectServer.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectServer.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Role, RoleDto>().ReverseMap();
            CreateMap<RoleEmployee, RoleEmployeeDto>().ReverseMap();
        }
    }
}
