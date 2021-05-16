using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Todos
{
    public class Details
    {
        public class Query : IRequest<Result<TodoDTO>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<TodoDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<TodoDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var todo = await _context.Todos.ProjectTo<TodoDTO>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(x => x.Id == request.Id);
                return Result<TodoDTO>.Success(todo);
            }
        }
    }
}
