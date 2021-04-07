using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodosController : BaseApiController
    {
        private readonly DataContext _context;
        public TodosController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Todo>>> GetTodo()

        {
            return await _context.Todos.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(Guid id)
        {
            return await _context.Todos.FindAsync(id);
        }
    }
}
