using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public class IsOwnerChecking : IAuthorizationRequirement
    {
    }
    public class IsOwnerCheckingHandler : AuthorizationHandler<IsOwnerChecking>
    {
        private readonly DataContext _dataContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsOwnerCheckingHandler(DataContext dataContext, IHttpContextAccessor httpContextAccessor)
        {
            _dataContext = dataContext;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsOwnerChecking requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Task.CompletedTask;

            var todoId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var participant = _dataContext.TodoParticipants.AsNoTracking().SingleOrDefaultAsync(x => x.UserId == userId && x.TodoId == todoId).Result;

            if (participant == null) return Task.CompletedTask;
            if (participant.IsOwner) context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}
