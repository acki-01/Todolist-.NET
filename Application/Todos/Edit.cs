using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Todos
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Todo Todo { get; set; }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var todo = _context.Todos.FindAsync(request.Todo.Id);
                await _mapper.Map(request.Todo, todo);

                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}
