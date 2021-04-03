using System;

namespace Domain
{
    public class Todo
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Comment { get; set; }
        public int Category { get; set; }
        public int Priority { get; set; }
        public DateTime Created_At { get; set; }

    }
}