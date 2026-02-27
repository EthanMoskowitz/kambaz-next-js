"use client";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { useState } from "react";

export default function AssignmentEditor() {
  const router = useRouter();
  const { cid, aid } = useParams();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer,
  );
  const dispatch = useDispatch();

  const isNewAssignment = assignments.every(
    (assignment) => assignment._id != aid,
  );

  const [assignment, setAssignment] = useState(
    assignments.find((assignment: any) => assignment._id === aid) ?? {
      _id: aid,
      course: cid,
      title: "",
      description: "",
      points: 0,
      group: "assignments",
      displayGradeAs: "percentage",
      submissionType: "online",
      textEntry: false,
      websiteUrl: false,
      mediaRecording: false,
      studentAnnotation: false,
      fileUpload: false,
      assignTo: "Everyone",
      dueDate: null,
      availableFrom: null,
      availableUntil: null,
    },
  );

  const handleSave = () => {
    const toSave = isNewAssignment
      ? { ...assignment, course: cid }
      : assignment;
    if (isNewAssignment) {
      dispatch(addAssignment(toSave));
    } else {
      dispatch(updateAssignment(toSave));
    }
    router.push(`/courses/${cid}/assignments/`);
  };

  return (
    <div id="wd-assignments-editor">
      <Form.Group id="wd-name">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl
          type="text"
          className="mb-3"
          value={assignment?.title || ""}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group id="wd-description">
        <FormLabel>Description</FormLabel>
        <FormControl
          className="mb-3"
          as="textarea"
          rows={5}
          value={assignment?.description || ""}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </Form.Group>
      <Form.Group as={Row} id="wd-points" className="mb-3">
        <FormLabel column sm={2}>
          Points
        </FormLabel>
        <Col sm={10}>
          <FormControl
            type="number"
            value={assignment?.points || ""}
            className="mb-3"
            onChange={(e) =>
              setAssignment({
                ...assignment,
                points: parseInt(e.target.value) || 0,
              })
            }
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} id="wd-group" className="mb-3">
        <FormLabel column sm={2}>
          Assignment Group
        </FormLabel>
        <Col sm={10}>
          <Form.Select value={assignment?.group || "assignments"}>
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
          <Form.Select
            value={assignment?.displayGradeAs || "percentage"}
            className="mb-3 float-end"
          >
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
            <Form.Select
              value={assignment?.submissionType || "online"}
              className="mb-3 float-end"
            >
              <option value="online">Online</option>
              <option value="paper">On Paper</option>
            </Form.Select>
            <Form.Group id="wd-online-entry-options">
              <FormLabel className="fw-bold">Online Entry Options</FormLabel>
              <Form.Check
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
                checked={assignment?.textEntry || false}
              />
              <Form.Check
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
                checked={assignment?.websiteUrl || false}
              />
              <Form.Check
                type="checkbox"
                id="wd-media-recording"
                label="Media Recordings"
                checked={assignment?.mediaRecording || false}
              />
              <Form.Check
                type="checkbox"
                id="wd-student"
                label="Student Annotation"
                checked={assignment?.studentAnnotation || false}
              />
              <Form.Check
                type="checkbox"
                id="wd-file"
                label="File Uploads"
                checked={assignment?.fileUpload || false}
              />
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
                  value={assignment?.assignTo || "Everyone"}
                  className="mb-3 float-end"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group id="wd-due-date">
                <FormLabel className="fw-bold">Due</FormLabel>
                <FormControl
                  type="date"
                  value={
                    assignment?.dueDate
                      ? typeof assignment.dueDate === "string"
                        ? assignment.dueDate.split("T")[0]
                        : assignment.dueDate
                      : ""
                  }
                  className="mb-3 float-end"
                  onChange={(e) =>
                    setAssignment({ ...assignment, dueDate: e.target.value })
                  }
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group id="wd-available-date">
                  <FormLabel className="fw-bold">Available From:</FormLabel>
                  <FormControl
                    type="date"
                    value={
                      assignment?.availableFrom
                        ? typeof assignment.availableFrom === "string"
                          ? assignment.availableFrom.split("T")[0]
                          : assignment.availableFrom
                        : ""
                    }
                    className="mb-3 float-end"
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableFrom: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group id="wd-until">
                  <FormLabel className="fw-bold">Until:</FormLabel>
                  <FormControl
                    type="date"
                    value={
                      assignment?.availableUntil
                        ? typeof assignment.availableUntil === "string"
                          ? assignment.availableUntil.split("T")[0]
                          : assignment.availableUntil
                        : ""
                    }
                    className="mb-3 float-end"
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableUntil: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Col>
      </Form.Group>
      <ListGroup className="float-end">
        <ListGroup.Item className="border-0">
          <Button
            id="wd-cancel"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            Cancel
          </Button>
          &nbsp;
          <Button
            id="wd-save"
            variant="danger"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            Save
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
