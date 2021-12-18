import { observer } from 'mobx-react-lite';
import { Profile } from '../../../app/models/profile';

interface Props {
    participants: Profile[];
}

function TodoParticipantsList({ participants }: Props) {
    return (
        <>
            {participants.map((participant) => participant.userName).join(', ')}
        </>
    );
}

export default observer(TodoParticipantsList);
