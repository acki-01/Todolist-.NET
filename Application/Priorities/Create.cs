
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Priorities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Priority Priority { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Priority).SetValidator(new PriorityValidator());
            }
        }          

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var priority = await _context.Priorities.FirstOrDefaultAsync(x => x.Type == request.Priority.Type);
                if(priority != null) return Result<Unit>.Failure("Priority already exists");

                _context.Priorities.Add(request.Priority);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create priority");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
