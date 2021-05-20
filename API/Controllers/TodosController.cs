using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Todos;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class TodosController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTodos(string sortBy)

        {
            return HandleResult(await Mediator.Send(new List.Query { SortBy = sortBy }));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodo(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));

        }

        [HttpPost]
        public async Task<IActionResult> CreateTodo(Todo todo)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Todo = todo }));
        }

        [Authorize(Policy = "IsTodoOwner")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditTodo(Guid id, Todo todo)
        {
            todo.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Todo = todo }));
        }

        [Authorize(Policy = "IsTodoOwner")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
        [HttpPost("{id}/participate")]
        public async Task<IActionResult> Participate(Guid id)
        {
            return HandleResult(await Mediator.Send(new HandleParticipation.Command { Id = id }));
        }
    }
}
 