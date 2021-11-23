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

namespace Application.Priorities
{
    public class List
    {
        public class Query : IRequest<Result<List<Priority>>> { }
        public class Handler : IRequestHandler<Query, Result<List<Priority>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<Priority>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var priorities = await _context.Priorities.ProjectTo<Priority>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
                return Result<List<Priority>>.Success(priorities);
            }
        }
    }
}
 