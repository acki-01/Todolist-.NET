using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Todo> Todos { get; set; }
        public DbSet<TodoParticipant> TodoParticipants { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<TodoParticipant>(x => x.HasKey(participant => new { participant.UserId, participant.TodoId }));

            builder.Entity<TodoParticipant>().HasOne(participant => participant.User).WithMany(participant => participant.Todos).HasForeignKey(participant => participant.UserId);
            builder.Entity<TodoParticipant>().HasOne(participant => participant.Todo).WithMany(participant => participant.Participants).HasForeignKey(participant => participant.TodoId);
        }
    }
}
