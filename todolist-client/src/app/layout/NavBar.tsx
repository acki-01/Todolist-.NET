import React from 'react'
import {Button, Container, Menu} from "semantic-ui-react";

interface Props {
    openForm: () => void
}

export default function NavBar({openForm}: Props) {
    return (
        <Menu inverted fixed={"top"}>
            <Container>
                <Menu.Item>
                    <img src={"/assets/logo.png"} alt={"logo"} style={{marginRight: '10px'}}/>
                    Todos App
                </Menu.Item>
                <Menu.Item name={"Todo"}/>
                <Menu.Item>
                    <Button onClick={openForm} positive content={"Create Todo"}/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}