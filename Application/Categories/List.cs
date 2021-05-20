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

namespace Application.Categories
{
    public class List
    {
        public class Query : IRequest<Result<List<Category>>> { }
        public class Handler : IRequestHandler<Query, Result<List<Category>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<Category>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var categories = await _context.Categories.ProjectTo<Category>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);
                return Result<List<Category>>.Success(categories);
            }
        }
    }
}
 