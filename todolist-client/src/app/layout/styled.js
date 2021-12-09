import styled from 'styled-components';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Menu, Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';

export const StyledLayout = styled(Layout)`
    background-color: inherit;
    max-width: 768px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    min-height: 550px;
    min-width: 100%;
`;

export const StyledHeader = styled(Header)`
    width: 100%;
    display: flex;
    align-items: stretch;
`;

export const StyledMenuElements = styled.div`
    display: flex;
    justify-content: space-around;
    width: 30%;
    font-size: 18px;
`;

export const StyledMenu = styled(Menu)`
    display: inherit;
    width: inherit;
    justify-content: space-between;
`;

export const StyledNavLink = styled(NavLink)`
    width: 140px;
    display: flex;
    justify-content: space-between;
    margin-right: 60px;
`;

export const StyledDropdown = styled(Dropdown)`
    font-size: 18px;
    color: white;
    display: flex;
    width: 105px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
