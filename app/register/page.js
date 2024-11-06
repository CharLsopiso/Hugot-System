"use client";
import { Container, Button, Form, Card } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { fullname: "", username: "", password: "" };

    if (!fullname) {
      newErrors.fullname = "Full name is required.";
      valid = false;
    }

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

  const save = async () => {
    if (!validateForm()) return;

    const url = "http://localhost/projectapi/insertusers.php";

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await axios({
        url: url,
        method: "POST",
        data: formData,
      });

      if (response.data == 1) {
        alert("You have successfully registered!");
        router.push("/"); // Redirect to login page
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={{backgroundColor: '#e3f2fd'}}>
      <Card className="p-4" style={{ width: '400px'}}>
        <Card.Body>
          <h1 className="text-center mb-4">Register here</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formFullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                isInvalid={!!errors.fullname}
              />
              <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
            </Form.Group>

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

            <Button variant="primary" onClick={save}>
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
