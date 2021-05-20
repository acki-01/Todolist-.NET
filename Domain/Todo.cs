using System;
using System.Collections.Generic;

namespace Domain
{
    public class Todo
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Comment { get; set; }
        public Category Category { get; set; }
        public int Priority { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime Updated_At { get; set; }
        public DateTime Finish_Time { get; set; }
        public bool Done { get; set; }

        public ICollection<TodoParticipant> Participants { get; set; } = new List<TodoParticipant>();

    }
}