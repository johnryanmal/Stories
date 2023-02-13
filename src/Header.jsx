import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import axios from "axios";

export function Header() {
	const login = localStorage.getItem("jwt") !== null

	const handleLogout = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };


  return (
		<Navbar bg="light" variant="light" fixed="top">
			<Container>
				<Navbar.Brand href="/stories">Stories</Navbar.Brand>
				<Nav activeKey={location.pathname} className="me-auto">
					<Nav.Link href="/stories">All Stories</Nav.Link>
					<Nav.Link href="/stories/user">My Stories</Nav.Link>
				</Nav>
				<Nav activeKey={location.pathname}>
					{ login && (
					<>
						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					</>
					) || (
					<>
						<Nav.Link href="/login">Login</Nav.Link>
						<Nav.Link href="/signup">Signup</Nav.Link>
					</>
					)}
				</Nav>
			</Container>
		</Navbar>
  );
}