using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
        public class Query : IRequest<Result<List<TodoDTO>>> { }
        public class Handler : IRequestHandler<Query, Result<List<TodoDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<TodoDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var todos = await _context.Todos.ProjectTo<TodoDTO>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
                return Result<List<TodoDTO>>.Success(todos);
            }
        }
    }
}
 