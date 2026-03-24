"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { addEnrollment, deleteEnrollment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { RootState } from "../store";
export default function Dashboard() {
  interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
  }

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  ) as { currentUser: User | null };
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentReducer,
  );
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [showAllEnrollments, setShowAllEnrollments] = useState(false);

  const isStudent = currentUser?.role === "STUDENT";

  const userEnrollments = courses.filter(
    (course) =>
      currentUser !== null &&
      currentUser._id !== null &&
      enrollments.some(
        (enrollment) =>
          enrollment.user === currentUser._id &&
          enrollment.course === course._id,
      ),
  );

  const coursesToShow = showAllEnrollments ? courses : userEnrollments;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>
        Enrollments
        <button
          className="btn btn-primary float-end me-2"
          id="wd-enrollments-click"
          onClick={() => setShowAllEnrollments(!showAllEnrollments)}
        >
          {showAllEnrollments ? "Show My Enrollments" : "Show All Courses"}
        </button>
      </h5>
      <br />
      {!isStudent && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </>
      )}
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses (
        {
          courses.filter(
            (course) =>
              currentUser !== null &&
              currentUser._id !== null &&
              enrollments.some(
                (enrollment) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id,
              ),
          ).length
        }
        )
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {coursesToShow.map((course) => (
            // eslint-disable-next-line react/jsx-key
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={
                    enrollments.some(
                      (enrollment) =>
                        currentUser !== null &&
                        currentUser?._id !== null &&
                        enrollment.user === currentUser._id &&
                        enrollment.course === course._id,
                    )
                      ? `/courses/${course._id}/home`
                      : ""
                  }
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src={course.image}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary"> Go </Button>
                    {!isStudent && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                    {currentUser !== null && currentUser?._id !== null && (
                      <>
                        {enrollments.some(
                          (enrollment) =>
                            enrollment.user === currentUser._id &&
                            enrollment.course === course._id,
                        ) ? (
                          <Button
                            id="wd-unenroll-click"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                deleteEnrollment({
                                  user: currentUser._id,
                                  course: course._id,
                                }),
                              );
                            }}
                            className="btn btn-danger me-2 float-end"
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            id="wd-enroll-click"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                addEnrollment({
                                  user: currentUser._id,
                                  course: course._id,
                                }),
                              );
                            }}
                            className="btn btn-success me-2 float-end"
                          >
                            Enroll
                          </Button>
                        )}
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
