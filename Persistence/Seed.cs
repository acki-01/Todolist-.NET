using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any() && !context.Todos.Any())
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

            var todos = new List<Todo>
            {
                new Todo
                {
                    Category = 1,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Pierwszy todos Janka", 
                    Comment = "To jest komentarz",
                    Priority = 2,
                    Title = "Janek- zakupy",
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
                    Category = 2,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(2),
                    Description = "Drugi todos Janka",
                    Comment = "To jest komentarz",
                    Priority = 1,
                    Title = "Janek- ćwiczenia",
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
                    Category = 1,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Pierwszy todos Arka",
                    Comment = "To jest komentarz",
                    Priority = 2,
                    Title = "Arek- zakupy",
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
                    Category = 2,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Drugi todos Arka",
                    Comment = "To jest komentarz",
                    Priority = 2,
                    Title = "Arek- ćwiczenia",
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
                    Category = 1,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Pierwszy todos Stasia",
                    Comment = "To jest komentarz",
                    Priority = 2,
                    Title = "Stas- zakupy",
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
                    Category = 2,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(2),
                    Description = "Drugi todos Stasia",
                    Comment = "To jest komentarz",
                    Priority = 1,
                    Title = "Stas- ćwiczenia",
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
                    Category = 1,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Pierwszy todos Marka",
                    Comment = "To jest komentarz",
                    Priority = 2,
                    Title = "Marek- zakupy",
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
                    Category = 2,
                    Created_At = DateTime.Now,
                    Updated_At = DateTime.Now,
                    Finish_Time = DateTime.Now.AddDays(5),
                    Description = "Drugi todos Marka",
                    Comment = "To jest komentarz",
                    Priority = 2,
                    Title = "Marek- ćwiczenia",
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