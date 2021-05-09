using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class TodoParticipant
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public Guid TodoId { get; set; }
        public Todo Todo { get; set; }
        public bool IsOwner { get; set; }
    }
}
