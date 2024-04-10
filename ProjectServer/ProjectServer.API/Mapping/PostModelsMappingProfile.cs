using AutoMapper;
using ProjectServer.API.Models;
using ProjectServer.Core.Models;

namespace ProjectServer.API.Mapping
{
    public class PostModelsMappingProfile : Profile
    {
        public PostModelsMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>();
            CreateMap<RolePostModel, Role>();
            CreateMap<RoleEmployeePostModel, RoleEmployee>();
        }
    }
}
