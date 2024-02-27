import { Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";

import { authenticateUser } from "@/lib/authenticate";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(user, password);
      await updateAtoms();
      router.push("/favourites");
    } catch (error) {
      setWarning(error.message);
    }
  }

  async function updateAtoms() {
    setFavourites(await getFavourites());
    setSearchHistory(await getHistory());
  }

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>Enter your login information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            id="userName"
            name="userName"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Login
        </Button>
      </Form>
      {warning && (
        <>
          <br />
          <Alert variant="danger">{warning}</Alert>
        </>
      )}
    </>
  );
}
