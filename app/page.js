"use client";
import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "Username is required.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const login = async () => {
    if (!validateForm()) return;

    const url = "http://localhost/projectapi/login.php";

    try {
      const response = await axios.get(url, {
        params: { username: username, password: password },
      });

      if (response.data.length > 0) {
        sessionStorage.setItem("user_id",response.data[0].id);
        sessionStorage.setItem("user_name",response.data[0].user_fullname);
        
        router.push("/hugot");

      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 " style={{backgroundColor: '#e3f2fd'}}>
      <Card className="p-4" style={{ width: '400px' }}>
        <Card.Body>
          <h1 className="text-center mb-4">Hugot System</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" onClick={login}>
              Login
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <p>
              Don't have an account? <a href="/register">Register here</a>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
