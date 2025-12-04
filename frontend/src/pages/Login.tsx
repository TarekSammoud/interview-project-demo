import React, { useState } from "react";
import { Form, Stack, Button, Alert, Spinner } from "react-bootstrap";
import { useAuthContext } from "../context/AuthContext"; // adjust path
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { login, loading, error } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate("/produits");
  };

  return (
    <Stack
      gap={3}
      className="col-md-4 mx-auto mt-5 p-4 border rounded shadow-sm"
    >
      <h3 className="text-center">Login</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Adresse E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Login"}
        </Button>
      </Form>
      <div>Vous n'avez pas de compte ? <Link to="/sign-up">Inscrivez vous</Link></div>
    </Stack>
  );
}

export default Login;
