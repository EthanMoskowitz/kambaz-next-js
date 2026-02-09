"use client";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <Form.Group id="wd-name">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl
          type="text"
          className="mb-3"
          defaultValue={"A1 - ENV + HTML"}
        />
      </Form.Group>
      <Form.Group id="wd-description">
        <FormLabel>Description</FormLabel>
        <FormControl
          className="mb-3"
          as="textarea"
          rows={5}
          defaultValue={
            "The assignment is available online Submit a link to the landing page of the assignment."
          }
        />
      </Form.Group>
      <Form.Group as={Row} id="wd-points" className="mb-3">
        <FormLabel column sm={2}>
          Points
        </FormLabel>
        <Col sm={10}>
          <FormControl type="number" defaultValue={100} className="mb-3" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} id="wd-group" className="mb-3">
        <FormLabel column sm={2}>
          Assignment Group
        </FormLabel>
        <Col sm={10}>
          <Form.Select defaultValue="assignments">
            <option value="assignments">Assignments</option>
            <option value="quizzes">Quizzes</option>
            <option value="exams">Exams</option>
            <option value="projects">Projects</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} id="wd-display" className="mb-3">
        <FormLabel column sm={2}>
          Display Grade as
        </FormLabel>
        <Col sm={10}>
          <Form.Select defaultValue="percentage" className="mb-3 float-end">
            <option value="percentage">Percentage</option>
            <option value="points">Points</option>
            <option value="letter">Letter Grade</option>
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} id="wd-submission" className="mb-3">
        <FormLabel column sm={2}>
          Submission Type
        </FormLabel>
        <Col sm={10}>
          <Container className="p-3 m-0 border-10 border rounded border-gray">
            <Form.Select defaultValue="online" className="mb-3 float-end">
              <option value="online">Online</option>
              <option value="paper">On Paper</option>
            </Form.Select>
            <Form.Group id="wd-online-entry-options">
              <FormLabel className="fw-bold">Online Entry Options</FormLabel>
              <Form.Check
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
              />
              <Form.Check
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
              />
              <Form.Check
                type="checkbox"
                id="wd-media-recording"
                label="Media Recordings"
              />
              <Form.Check
                type="checkbox"
                id="wd-student"
                label="Student Annotation"
              />
              <Form.Check type="checkbox" id="wd-file" label="File Uploads" />
            </Form.Group>
          </Container>
        </Col>
      </Form.Group>
      <Form.Group as={Row} id="wd-assign" className="mb-3">
        <Form.Label column sm={2}>
          Assign
        </Form.Label>
        <Col className="mb-3">
          <Container className="p-3 m-0 border-10 border rounded border-gray">
            <Row>
              <Form.Group id="wd-assign-to">
                <FormLabel className="fw-bold">Assign To:</FormLabel>
                <FormControl
                  type="text"
                  defaultValue="Everyone"
                  className="mb-3 float-end"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group id="wd-due-date">
                <FormLabel className="fw-bold">Due</FormLabel>
                <FormControl
                  type="date"
                  defaultValue="2026-01-01"
                  className="mb-3 float-end"
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group id="wd-available-date">
                  <FormLabel className="fw-bold">Available From:</FormLabel>
                  <FormControl
                    type="date"
                    defaultValue="2025-12-01"
                    className="mb-3 float-end"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group id="wd-until">
                  <FormLabel className="fw-bold">Until:</FormLabel>
                  <FormControl
                    type="date"
                    defaultValue="2026-02-01"
                    className="mb-3 float-end"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Col>
      </Form.Group>
      <table className="float-end">
        <tr>
          <td colSpan={5} align="right" valign="top">
            <Button id="wd-cancel" variant="secondary">
              Cancel
            </Button>
            &nbsp;
            <Button id="wd-save" variant="danger">
              Save
            </Button>
          </td>
        </tr>
      </table>
    </div>
  );
}
