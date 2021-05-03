using Domain;
using FluentValidation;

namespace Application.Todos
{
    public class TodoValidator : AbstractValidator<Todo>
    {
        public TodoValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.Created_At).NotEmpty();
            RuleFor(x => x.Updated_At).NotEmpty();
            RuleFor(x => x.Finish_Time).NotEmpty();
            // RuleFor(x => x.User_Id).NotEmpty();
        }
    }
}
