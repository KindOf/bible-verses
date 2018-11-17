import React from 'react';
import { Navbar, Alignment, Button } from '@blueprintjs/core';

const Header = () => {
  return (
    <Navbar fixedToTop>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Bible Verses App</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Button className="bp3-minimal" icon="document" text="Logout" />
      </Navbar.Group>
    </Navbar>
  )
}

export default Header;
