
using ProjectServer.API.Mapping;
using ProjectServer.Core.Mapping;
using ProjectServer.Core.Models;
using ProjectServer.Core.Repositories;
using ProjectServer.Core.Services;
using ProjectServer.Data;
using ProjectServer.Data.Repositories;
using ProjectServer.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(MappingProfile), typeof(PostModelsMappingProfile));
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IRoleEmployeeRepository, RoleEmployeeRepository>();

builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IRoleEmployeeService, RoleEmployeeService>();

builder.Services.AddDbContext<DataContext>();

var policy = "policy";
builder.Services.AddCors(option => option.AddPolicy(name: policy, policy =>
{
    policy.AllowAnyOrigin(); policy.AllowAnyHeader(); policy.AllowAnyMethod();
}));

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(policy);

app.MapControllers();

app.Run();
