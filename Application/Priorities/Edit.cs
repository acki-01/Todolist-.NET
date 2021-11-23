using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Priorities
{
    public class Edit
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

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var priority = await _context.Priorities.FindAsync(request.Priority.Id);
                if (priority == null) return null;
                _mapper.Map(request.Priority, priority);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Unable to edit priority");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
