using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Todos
{
    public class HandleParticipation
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var todo = await _context.Todos.Include(t => t.Participants).ThenInclude(u => u.User).FirstOrDefaultAsync(user => user.Id == request.Id);
                if (todo == null) return null;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var ownerUserName = todo.Participants.FirstOrDefault(p => p.IsOwner)?.User?.UserName;

                var participation = todo.Participants.FirstOrDefault(p => p.User.UserName == user.UserName);

                if(participation == null)
                {
                    participation = new TodoParticipant
                    {
                        User = user,
                        Todo = todo,
                        IsOwner = false,
                    };
                    todo.Participants.Add(participation);
                }

                var result = await _context.SaveChangesAsync() > 0;
                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating participation");
            }
        }
    }
}
