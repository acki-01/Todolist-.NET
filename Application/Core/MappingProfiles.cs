using Application.Todos;
using AutoMapper;
using Domain;
using System.Linq;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Todo, Todo>();
            CreateMap<Todo, TodoDTO>().ForMember(dest => dest.OwnerName, opt => opt.MapFrom(source => source.Participants.FirstOrDefault(participant => participant.IsOwner).User.UserName));
            CreateMap<TodoParticipant, Profiles.Profile>()
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(source => source.User.DisplayName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(source => source.User.UserName))
                .ForMember(dest => dest.Bio, opt => opt.MapFrom(source => source.User.Bio));

        }
    }
}
