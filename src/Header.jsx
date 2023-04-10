import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom'

import axios from "axios";

export function Header(props) {
	const navigate = useNavigate();
	const login = localStorage.getItem("jwt") !== null

	const handleLogout = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
		navigate('/');
		navigate(0); //refresh
  };


  return (
		<Navbar bg="light" variant="light" fixed="top" ref={props._ref}>
			<Container>
				<Navbar.Brand as={Link} to="/">Stories</Navbar.Brand>
				<Nav activeKey={location.pathname} className="me-auto">
					<Nav.Link as={Link} to="/">All Stories</Nav.Link>
					<Nav.Link as={Link} to="/user">My Stories</Nav.Link>
					<Nav.Link as={Link} to="/new">New Story</Nav.Link>
				</Nav>
				<Nav activeKey={location.pathname}>
					{ login && (
					<>
						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					</>
					) || (
					<>
						<Nav.Link as={Link} to="/login">Login</Nav.Link>
						<Nav.Link as={Link} to="/signup">Signup</Nav.Link>
					</>
					)}
				</Nav>
			</Container>
		</Navbar>
  );
}