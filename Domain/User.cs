using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain
{
    public class User : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<TodoParticipant> Todos { get; set; }

    }
}
