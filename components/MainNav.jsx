import React, { useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";
import { removeToken, readToken } from "@/lib/authenticate";

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let token = readToken();

  const router = useRouter();

  async function submitForm(e) {
    e.preventDefault();

    const queryString = `title=true&q=${searchField}`;
    router.push(`/artwork?${queryString}`);

    setSearchField("");

    setSearchHistory(await addToHistory(queryString));

    setIsExpanded(false);
  }

  function handleInputChange(e) {
    setSearchField(e.target.value);
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar
        expand="lg"
        expanded={isExpanded}
        className="fixed-top navbar-dark bg-primary"
      >
        <Container fluid>
          <Navbar.Brand>Anh Chien Vu</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          {console.log(isExpanded)}
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {!token && (
              <Nav>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Login
                  </Nav.Link>
                </Link>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>
              </Nav>
            )}
            &nbsp;
            {token && (
              <Form onSubmit={(e) => submitForm(e)} className="d-flex">
                <Form.Group controlId="formBasicSearch">
                  <Form.Control
                    // size='lg'
                    type="text"
                    placeholder="Search"
                    name="searchText"
                    value={searchField}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button
                  style={{ marginLeft: "1rem" }}
                  variant="outline-success"
                  type="submit"
                >
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            {token && (
              <Nav>
                <NavDropdown title={token.userName} align="end">
                  {/* using Link to prevent refresh page, that will end up with losing data (state) in component */}
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/favourites"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>

                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      active={router.pathname === "/history"}
                      onClick={() => setIsExpanded(false)}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>

                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br /> <br />
    </>
  );
}
