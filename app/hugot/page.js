"use client";
import { Container, Button, Row, Col, Table, Form, Card, Alert, Navbar, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const HugotPage = () => {
  const router = useRouter();
  const [hugot, setHugot] = useState("");
  const [hugots, setHugots] = useState([]);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [ratings, setRatings] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [name, setName] = useState('')
  const getRecords = async () => {
    const url = "http://localhost/projectapi/hugotslists.php";
    try {
      const response = await axios.get(url);
      setHugots(response.data);
    } catch (error) {
      console.error("Error fetching hugots:", error);
    }
  };

  const getComments = async () => {
    try {
      const url = "http://localhost/projectapi/getcomments.php";
      const response = await axios.get(url);
      if (typeof response.data === "object" && response.data !== null) {
        setComments(response.data);
      } else {
        console.error("Expected an object with hugot_id keys but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getRecords();
    getComments();
    setName(sessionStorage.getItem('user_name'));
  }, []);

  const saveHugot = async () => {
    if (!hugot) {
      setAlertMessage("Please enter a hugot before saving.");
      return;
    }

    const url = "http://localhost/projectapi/inserthugots.php";
    const formData = new FormData();
    formData.append("user_id", sessionStorage.getItem("user_id"));
    formData.append("hugot", hugot);

    try {
      const response = await axios.post(url, formData);
      if (response.data === 1) {
        setAlertMessage("Hugot added successfully!");
        setHugot("");
        getRecords();
      } else {
        setAlertMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error adding hugot:", error);
      setAlertMessage("An error occurred while adding the hugot. Check console for details.");
    }
  };

  const saveComment = async (hugotId) => {
    const comment = newComments[hugotId] || "";

    if (!hugotId || !comment) {
      setAlertMessage("Please enter a comment before saving.");
      return;
    }

    const url = "http://localhost/projectapi/addcomments.php";
    const formData = new FormData();
    formData.append("hugot_id", hugotId);
    formData.append("comment", comment);

    try {
      const response = await axios.post(url, formData);
      if (response.data === 1) {
        setAlertMessage("Comment added successfully!");
        setNewComments((prev) => ({ ...prev, [hugotId]: "" }));
        getComments();
      } else {
        setAlertMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setAlertMessage("An error occurred while adding the comment. Check console for details.");
    }
  };

  const saveRating = async (hugotId, rating) => {
    if (!hugotId || !rating) {
      setAlertMessage("Please select a rating before saving.");
      return;
    }

    const url = "http://localhost/projectapi/addrating.php";
    const formData = new FormData();
    formData.append("hugot_id", hugotId);
    formData.append("rating", rating);

    try {
      const response = await axios.post(url, formData);
      if (response.data === 1) {
        setAlertMessage("Rating added successfully!");
        getRecords();
      } else {
        setAlertMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error adding rating:", error);
      setAlertMessage("An error occurred while adding the rating. Check console for details.");
    }
  };

  const handleRatingChange = (hugotId, rating) => {
    setRatings((prev) => ({ ...prev, [hugotId]: rating }));
    saveRating(hugotId, rating); // Save rating immediately when changed
  };

  const handleCommentChange = (hugotId, value) => {
    setNewComments((prev) => ({ ...prev, [hugotId]: value }));
  };

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Hugot App</Navbar.Brand>
          <Nav className="ml-auto">
            <div className="d-flex align-items-center">
              <h5 style={{ color: 'white' }} className="fw-bold mt-2 me-2">{name}</h5>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
      <Container className="mt-4">
        {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
        <Row className="mb-4">
          <Col>
            <Card className="p-4">
              <Card.Body>
                <h1 className="text-center mb-4">Create a Hugot</h1>
                <Form>
                  <Form.Group className="mb-3" controlId="formHugot">
                    <Form.Control
                      type="text"
                      placeholder="Enter a hugot"
                      value={hugot}
                      onChange={(e) => setHugot(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={saveHugot}>
                    Save
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h4>Hugots List</h4>
              </Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Hugot</th>
                      <th>Comments</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hugots.map((hugot) => (
                      <tr key={hugot.hugot_id}>
                        <td>{hugot.hugot}</td>
                        <td>
                          <ul>
                            {comments[hugot.hugot_id] ? (
                              comments[hugot.hugot_id].map((comment) => (
                                <li key={comment.comment_id}>{comment.comment}</li>
                              ))
                            ) : (
                              <li>No comments available</li>
                            )}
                          </ul>
                          <Form.Control
                            className="mb-2"
                            placeholder="Enter a comment"
                            type="text"
                            value={newComments[hugot.hugot_id] || ""}
                            onChange={(e) => handleCommentChange(hugot.hugot_id, e.target.value)}
                          />
                          <Button
                            variant="secondary"
                            onClick={() => saveComment(hugot.hugot_id)}
                          >
                            Comment
                          </Button>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                onClick={() => handleRatingChange(hugot.hugot_id, star)}
                                style={{ fontSize: '24px', cursor: 'pointer' }}
                              >
                                {ratings[hugot.hugot_id] >= star ? '⭐' : '☆'}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HugotPage;
