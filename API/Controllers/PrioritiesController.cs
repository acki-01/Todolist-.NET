using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Application.Priorities;

namespace API.Controllers
{
    public class PrioritiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetPriorities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePriority(Priority priority)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Priority = priority }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPriority(Guid id, Priority priority)
        {
            priority.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Priority = priority }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePriority(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
 