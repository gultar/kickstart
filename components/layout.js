import React from 'react';
import { Menu, Container } from 'semantic-ui-react';
import Header from './header'

const Layout = (props) =>{
    return (
        <Container>
        <h1>{Header()}</h1>
        {props.children}
        </Container>
    )
}

export default Layout;

