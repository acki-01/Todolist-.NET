using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Todos
{
    public class List
    {
        public class Query : IRequest<Result<List<Todo>>> { }
        public class Handler : IRequestHandler<Query, Result<List<Todo>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Todo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Todo>>.Success(await _context.Todos.ToListAsync());
            }
        }
    }
}
 