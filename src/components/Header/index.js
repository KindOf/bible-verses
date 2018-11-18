import React from 'react';
import { Navbar, Alignment, Button } from '@blueprintjs/core';

const Header = ({ user, signOut }) => {
  return (
    <Navbar fixedToTop>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Bible Verses App</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        {
          user 
            ? (
              <Button
                intent="success"
                icon="document"
                text="Logout"
                onClick={() => signOut()}
              />
            )
            : null
        }
      </Navbar.Group>
    </Navbar>
  )
}

export default Header;
