using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Initial
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any() && !context.Todos.Any() && !context.Categories.Any())
            {
                var users = new List<User>
                {
                    new User{DisplayName= "Janek", UserName ="Jan", Email= "jan@example.com"},
                    new User{DisplayName= "Arek", UserName ="Arkadiusz", Email= "arkadiusz@example.com"},
                    new User{DisplayName= "Stas", UserName ="Stanislaw", Email= "stanislaw@example.com"},
                    new User{DisplayName= "Marek", UserName ="Marek", Email= "marek@example.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "B@ardzoTrudne1");
                }

                var categories = new List<Category>
                {
                    new Category{Id = new Guid(), Type = "Study"},
                    new Category{Id = new Guid(), Type = "Body Care"},
                    new Category{Id = new Guid(), Type = "People"},
                    new Category{Id = new Guid(), Type = "Daily Stuff"},
                };

                var priorities = new List<Priority>
                {
                    new Priority{Id = new Guid(), Type = 1},
                    new Priority{Id = new Guid(), Type = 2},
                    new Priority{Id = new Guid(), Type = 3}
                };

            var todos = new List<Todo>
            {
                new Todo
                {
                    Category = categories[3],
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Ziemniaki, mięso, pomidory", 
                    Comment = "To jest komentarz",
                    Priority = priorities[2],
                    Title = "Zakupy na obiad",
                    Done = true,
                    Participants = new List<TodoParticipant>
                    {
                        new TodoParticipant
                        {
                            User = users[0],
                            IsOwner = true,
                        },
                        new TodoParticipant
                        {
                            User = users[2],
                            IsOwner = false,
                        }
                    }
                },
                new Todo
                {
                    Category = categories[1],
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(2),
                    Description = "Push góra",
                    Comment = "To jest komentarz",
                    Priority = priorities[1],
                    Title = "FBW- ćwiczenia",
                    Done = false,
                    Participants = new List<TodoParticipant>
                    {
                        new TodoParticipant
                        {
                            User = users[0],
                            IsOwner = true,
                        },
                        new TodoParticipant
                        {
                            User = users[1],
                            IsOwner = false,
                        }
                    }
                },
                new Todo
                {
                    Category = categories[3],
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Cokolwiek do zjedzenia",
                    Comment = "To jest komentarz",
                    Priority = priorities[2],
                    Title = "Zakupy",
                    Done = true,
                    Participants = new List<TodoParticipant>
                    {
                        new TodoParticipant
                        {
                            User = users[1],
                            IsOwner = true,
                        },
                        new TodoParticipant
                        {
                            User = users[2],
                            IsOwner = false,
                        }
                    }
                },
                new Todo
                {
                    Category = categories[2],
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Nad Wisełkę",
                    Comment = "To jest komentarz",
                    Priority = priorities[2],
                    Title = "Wypad na pi...sok",
                    Done = true,
                    Participants = new List<TodoParticipant>
                    {
                        new TodoParticipant
                        {
                            User = users[1],
                            IsOwner = true,
                        },
                        new TodoParticipant
                        {
                            User = users[2],
                            IsOwner = false,
                        }
                    }
                },
                new Todo
                {
                    Category = categories[0],
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(10),
                    Description = "Pilnie uczyć się .NET",
                    Comment = "To jest komentarz",
                    Priority = priorities[1],
                    Title = ".NET",
                    Done = true,
                    Participants = new List<TodoParticipant>
                    {
                        new TodoParticipant
                        {
                            User = users[1],
                            IsOwner = true,
                        },
                        new TodoParticipant
                        {
                            User = users[2],
                            IsOwner = false,
                        }
                    }
                },
                new Todo
                {
                    Category = categories[1],
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Bieżnia",
                    Comment = "To jest komentarz",
                    Priority = priorities[2],
                    Title = "Ćwiczenia",
                    Done = false,
                    Participants = new List<TodoParticipant>
                    {
                        new TodoParticipant
                        {
                            User = users[1],
                            IsOwner = true,
                        },
                        new TodoParticipant
                        {
                            User = users[3],
                            IsOwner = false,
                        }
                    }
                },
                 new Todo
                {
                    Category = categories[3],
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Kaszanka, dżem, mortadela",
                    Comment = "To jest komentarz",
                    Priority = priorities[2],
                    Title = "Zakupy",
                    Done = true,
                    Participants = new List<TodoParticipant>
                    {
                        new TodoParticipant
                        {
                            User = users[0],
                            IsOwner = false,
                        },
                        new TodoParticipant
                        {
                            User = users[2],
                            IsOwner = true,
                        }
                    }
                },
                new Todo
                {
                    Category = categories[1],
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(2),
                    Description = "Rower, bieżnia",
                    Comment = "To jest komentarz",
                    Priority = priorities[1],
                    Title = "Siłownia cardio",
                    Done = false,
                    Participants = new List<TodoParticipant>
                    {
                        new TodoParticipant
                        {
                            User = users[2],
                            IsOwner = true,
                        },
                        new TodoParticipant
                        {
                            User = users[1],
                            IsOwner = false,
                        }
                    }
                },
                new Todo
                {
                    Category = categories[3],
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Chleb, jajka, warzywa",
                    Comment = "To jest komentarz",
                    Priority = priorities[0],
                    Title = "Zakupy",
                    Done = true,
                    Participants = new List<TodoParticipant>
                    {
                        new TodoParticipant
                        {
                            User = users[3],
                            IsOwner = true,
                        },
                        new TodoParticipant
                        {
                            User = users[2],
                            IsOwner = false,
                        }
                    }
                },
                new Todo
                {
                    Category = categories[1],
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Pull dół",
                    Comment = "To jest komentarz",
                    Priority = priorities[2],
                    Title = "Siłownia",
                    Done = false,
                    Participants = new List<TodoParticipant>
                    {
                        new TodoParticipant
                        {
                            User = users[1],
                            IsOwner = false,
                        },
                        new TodoParticipant
                        {
                            User = users[3],
                            IsOwner = true,
                        }
                    }
                },
            };
                await context.Todos.AddRangeAsync(todos);
                await context.SaveChangesAsync();
            }
        }
    }
}