import Link from "next/link";
import AssignmentControlHeader from "./AssignmentControlHeader";
import AssignmentControl from "./AssignmentControl";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControl />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-light">
            <BsGripVertical className="me-2 fs-3" />
            <AssignmentControlHeader />
            Assignments
          </div>
        </ListGroupItem>
        <ListGroupItem className="wd-assignment-list-item p-0 fs-5 border-gray border-left-green">
          <div className="p-3 ps-2 bg-light">
            <Row className="align-items-center">
              <Col className="col-auto">
                <BsGripVertical className="me-2 fs-3 float-start" />
              </Col>
              <Col className="col-auto">
                <MdAssignment className="me-2 fs-3 float-start" color="green" />
              </Col>
              <Col className="col-auto">
                <Link
                  href="/courses/1234/assignments/123"
                  className="wd-assignment-link"
                >
                  A1 - ENV + HTML
                </Link>
                <div className="wd-assignment-details">
                  <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 6 at 12:00am |
                  <br />
                  <b>Due</b> May 13 at 11:59pm | 100pts
                </div>
              </Col>
              <Col className="float-end">
                <AssignmentControlButtons />
              </Col>
            </Row>
          </div>
        </ListGroupItem>
        <ListGroupItem className="wd-assignment-list-item p-0 fs-5 border-gray border-left-green">
          <div className="p-3 ps-2 bg-light">
            <Row className="align-items-center">
              <Col className="col-auto">
                <BsGripVertical className="me-2 fs-3 float-start" />
              </Col>
              <Col className="col-auto">
                <MdAssignment className="me-2 fs-3 float-start" color="green" />
              </Col>
              <Col className="col-auto">
                <Link
                  href="/courses/1234/assignments/124"
                  className="wd-assignment-link"
                >
                  A2 - CSS + BOOTSTRAP
                </Link>
                <div className="wd-assignment-details">
                  <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 13 at 12:00am |
                  <br />
                  <b>Due</b> May 20 at 11:59pm | 100pts
                </div>
              </Col>
              <Col className="float-end">
                <AssignmentControlButtons />
              </Col>
            </Row>
          </div>
        </ListGroupItem>
        <ListGroupItem className="wd-assignment-list-item p-0 fs-5 border-gray border-left-green">
          <div className="p-3 ps-2 bg-light">
            <Row className="align-items-center">
              <Col className="col-auto">
                <BsGripVertical className="me-2 fs-3 float-start" />
              </Col>
              <Col className="col-auto">
                <MdAssignment className="me-2 fs-3 float-start" color="green" />
              </Col>
              <Col className="col-auto">
                <Link
                  href="/courses/1234/assignments/125"
                  className="wd-assignment-link"
                >
                  A3 - JAVASCRIPT + REACT
                </Link>
                <div className="wd-assignment-details">
                  <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 20 at 12:00am |
                  <br />
                  <b>Due</b> May 27 at 11:59pm | 100pts
                </div>
              </Col>
              <Col className="float-end">
                <AssignmentControlButtons />
              </Col>
            </Row>
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
