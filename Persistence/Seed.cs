using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Todos.Any()) return;

            var todos = new List<Todo>
            {
                new Todo
                {
                    Category = 1,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Description = "Mój pierwszy todos", 
                    Comment = "Było ciężko",
                    Priority = 2,
                    Title = "Mój pierwszy todo",
                    Done = true,
                    User_Id = 2
                },
                new Todo
                {
                    Category = 1,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Description = "Mój pierwszy todos",
                    Comment = "Było ciężko",
                    Priority = 2,
                    Title = "Mój pierwszy todo",
                    Done = false,
                    User_Id = 1
                },
            };

            await context.Todos.AddRangeAsync(todos);
            await context.SaveChangesAsync();
        }
    }
}