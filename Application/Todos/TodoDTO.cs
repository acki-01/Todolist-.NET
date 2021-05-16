using Application.Profiles;
using System;
using System.Collections.Generic;

namespace Application.Todos
{
    public class TodoDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Comment { get; set; }
        public int Category { get; set; }
        public int Priority { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime Updated_At { get; set; }
        public DateTime Finish_Time { get; set; }
        public bool Done { get; set; }
        public string OwnerName { get; set; }
        public ICollection<Profile> Participants { get; set; }
    }
}
