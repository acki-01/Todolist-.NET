using Domain;
using FluentValidation;

namespace Application.Priorities
{
    public class PriorityValidator : AbstractValidator<Priority>
    {
        public PriorityValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Type).NotEmpty();
        }
    }
}
