import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    background-image: url(${(props) => props.bg});
    background-position: center;
    background-repeat: no-repeat;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    padding: 30px;
    margin-top: 100px;
    align-items: center;
    min-width: inherit;
    min-height: inherit;
    justify-content: center;
`;

export const Subtitle = styled.h3`
    color: white;
`;

export const ButtonContainer = styled.div`
    width: 200px;
    justify-content: space-between;
    display: flex;
`;

export const StyledLink = styled(Link)`
    color: white;
    padding: 5px 10px;
    border: 1px solid white;
    margin-top: 40px;

    &:hover {
        color: black;
        border-color: black;
        background-color: white;
    }
`;

export const StyledSpan = styled.span`
    color: white;
`;
