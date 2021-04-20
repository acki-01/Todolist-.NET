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
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Mój pierwszy todos", 
                    Comment = "Na początku było ciężko",
                    Priority = 2,
                    Title = "Mój pierwszy todo",
                    Done = true,
                    User_Id = 2
                },
                new Todo
                {
                    Category = 2,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(2),
                    Description = "Opis drugiego todosa",
                    Comment = "Prawie zrobione",
                    Priority = 2,
                    Title = "Mój drugi todo",
                    Done = false,
                    User_Id = 1
                },
                new Todo
                {
                    Category = 2,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(10),
                    Description = "Opis trzeciego todosa",
                    Comment = "komentarz",
                    Priority = 3,
                    Title = "Mój trzeci todo",
                    Done = false,
                    User_Id = 1
                },
                                                new Todo
                {
                    Category = 2,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(1),
                    Description = "Opis czwartego todosa",
                    Comment = "Prawie zrobione",
                    Priority = 2,
                    Title = "Mój czwarty todo",
                    Done = true,
                    User_Id = 1
                },
                                                                new Todo
                {
                    Category = 2,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(20),
                    Description = "Opis piątego todosa",
                    Comment = "Prawie zrobione",
                    Priority = 2,
                    Title = "Mój piąty todo",
                    Done = false,
                    User_Id = 1
                },
                                                                                new Todo
                {
                    Category = 2,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Opis szóstego todosa",
                    Comment = "Prawie zrobione",
                    Priority = 2,
                    Title = "Mój szósty todo",
                    Done = false,
                    User_Id = 2
                },
                                                                                                new Todo
                {
                    Category = 2,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(6),
                    Description = "Opis siódmego todosa",
                    Comment = "Prawie zrobione",
                    Priority = 2,
                    Title = "Mój siódmy todo",
                    Done = false,
                    User_Id = 3
                },
            };

            await context.Todos.AddRangeAsync(todos);
            await context.SaveChangesAsync();
        }
    }
}