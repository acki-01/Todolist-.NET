
using Domain;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Todos
{
    public class Create
    {
        public class Commmand : IRequest
        {
            public Todo Todo { get; set; }
        }

        public class Handler : IRequestHandler<Commmand>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Commmand request, CancellationToken cancellationToken)
            {
                _context.Todos.Add(request.Todo);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
