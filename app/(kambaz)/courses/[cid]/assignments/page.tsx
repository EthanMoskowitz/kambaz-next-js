"use client";
import Link from "next/link";
import AssignmentControlHeader from "./AssignmentControlHeader";
import AssignmentControl from "./AssignmentControl";
import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useParams } from "next/navigation";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

function formatDate(dateInput: string | Date) {
  const date = new Date(dateInput);

  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  return `${month} ${day} at ${hours}:${minutes}${ampm}`;
}

export default function Assignments() {
  const { cid } = useParams();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer,
  );
  console.log(assignments);
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
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            // eslint-disable-next-line react/jsx-key
            <ListGroupItem className="wd-assignment-list-item p-0 fs-5 border-gray border-left-green">
              <div className="p-3 ps-2 bg-light">
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <BsGripVertical className="me-2 fs-3 float-start" />
                  </Col>
                  <Col className="col-auto">
                    <MdAssignment
                      className="me-2 fs-3 float-start"
                      color="green"
                    />
                  </Col>
                  <Col className="col-auto">
                    <Link
                      href={`/courses/${cid}/assignments/${assignment._id}`}
                      className="wd-assignment-link"
                    >
                      {assignment.title}
                    </Link>
                    <div className="wd-assignment-details">
                      <span style={{ color: "red" }}>Multiple Modules</span> |{" "}
                      <b>Not available until</b>{" "}
                      {formatDate(assignment.availableFrom)} |
                      <br />
                      <b>Due</b> {formatDate(assignment.dueDate)} |{" "}
                      {assignment.points}pts
                    </div>
                  </Col>
                  <Col className="float-end">
                    <AssignmentControlButtons assignmentId={assignment._id} />
                  </Col>
                </Row>
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
