/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Col, Dropdown, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCheckCircle, FaBan, FaQuestionCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { RootState } from "../../../store";
import {
  addQuiz,
  deleteQuiz as deleteQuizAction,
  setQuizzes,
  updateQuiz,
} from "./reducer";
import * as client from "./client";

// Helper function for formatting dates
function formatDate(dateInput?: string | Date) {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  return `${month} ${day} at ${hours}:${minutes}${ampm}`;
}

// Helper function to determine quiz availability status
function getAvailabilityStatus(quiz: any) {
  const now = new Date();
  const avail = quiz.availableDate ? new Date(quiz.availableDate) : null;
  const until = quiz.untilDate ? new Date(quiz.untilDate) : null;
  if (avail && now < avail) {
    return `Not available until ${formatDate(quiz.availableDate)}`;
  }
  if (until && now > until) {
    return "Closed";
  }
  return "Available";
}

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser,
  );
  const isStudent = currentUser?.role === "STUDENT";

  const [scores, setScores] = useState<{ [quizId: string]: number }>({});

  // Fetch quizzes when component mounts or course ID changes
  useEffect(() => {
    if (!cid) return;
    client
      .fetchQuizzes(cid as string)
      .then((data) => dispatch(setQuizzes(data)));
  }, [cid, dispatch]);

  // For students, fetch their latest attempt scores for each quiz
  useEffect(() => {
    if (!isStudent || quizzes.length === 0) return;
    quizzes.forEach(async (quiz: any) => {
      try {
        const attempts = await client.getMyAttempts(
          quiz._id,
          currentUser?._id as string,
        );
        if (attempts.length > 0) {
          setScores((prev) => ({
            ...prev,
            [quiz._id]: attempts[attempts.length - 1].score,
          }));
        }
      } catch {
        /* no attempts yet */
      }
    });
  }, [quizzes, isStudent, currentUser?._id]);

  // Handler for adding a new quiz
  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuiz(cid as string, {
      title: "Unnamed Quiz",
      courseId: cid,
    });
    dispatch(addQuiz(newQuiz));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  // Handler for deleting a quiz
  const handleDelete = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    dispatch(deleteQuizAction(quizId));
  };

  // Handler for toggling quiz publish status
  const handleTogglePublish = async (quiz: any) => {
    if (quiz.published) {
      await client.unpublishQuiz(quiz._id);
    } else {
      await client.publishQuiz(quiz._id);
    }
    dispatch(updateQuiz({ ...quiz, published: !quiz.published }));
  };

  return (
    <div id="wd-quizzes">
      {!isStudent && (
        // Add Quiz button only for instructors
        <div className="d-flex justify-content-end mb-3">
          <button
            id="wd-add-quiz-btn"
            className="btn btn-danger"
            onClick={handleAddQuiz}
          >
            <FaPlus className="me-1" />
            Quiz
          </button>
        </div>
      )}

      <ListGroup className="rounded-0">
        <ListGroupItem className="p-0 fs-5 border-gray">
          <div className="p-3 ps-2 bg-light d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <b>Assignment Quizzes</b>
          </div>
        </ListGroupItem>

        {quizzes.length === 0 && (
          // Message when no quizzes are available
          <ListGroupItem className="p-3 text-muted">
            {isStudent
              ? "No quizzes available."
              : "No quizzes yet. Click + Quiz to add one."}
          </ListGroupItem>
        )}

        {quizzes
          .slice()
          // Sort quizzes by availability date, treating missing dates as earliest
          .sort((a: any, b: any) => {
            const da = a.availableDate
              ? new Date(a.availableDate).getTime()
              : 0;
            const db = b.availableDate
              ? new Date(b.availableDate).getTime()
              : 0;
            return da - db;
          })
          .map((quiz: any) => (
            <ListGroupItem
              key={quiz._id}
              className="p-0 fs-5 border-gray"
              style={{ borderLeft: "4px solid green" }}
            >
              <div className="p-3 ps-2">
                <Row className="align-items-center">
                  <Col className="col-auto">
                    <BsGripVertical className="me-2 fs-3" />
                  </Col>
                  <Col className="col-auto">
                    <FaQuestionCircle className="me-2 fs-4" color="green" />
                  </Col>
                  <Col>
                    <Link
                      href={`/courses/${cid}/quizzes/${quiz._id}`}
                      className="fw-bold text-decoration-none text-dark"
                    >
                      {quiz.title}
                    </Link>
                    <div className="text-muted" style={{ fontSize: "0.85em" }}>
                      <b>{getAvailabilityStatus(quiz)}</b>
                      {quiz.dueDate && (
                        <>
                          {" | "}
                          <b>Due</b> {formatDate(quiz.dueDate)}
                        </>
                      )}
                      {" | "}
                      {quiz.points} pts{" | "}
                      {quiz.questions?.length || 0} Questions
                      {isStudent && scores[quiz._id] !== undefined && (
                        <>
                          {" | "}Score: <b>{scores[quiz._id]}</b>
                        </>
                      )}
                    </div>
                  </Col>
                  {!isStudent && (
                    <Col className="col-auto d-flex align-items-center gap-2">
                      <span
                        onClick={() => handleTogglePublish(quiz)}
                        style={{ cursor: "pointer" }}
                        title={quiz.published ? "Unpublish" : "Publish"}
                      >
                        {quiz.published ? (
                          <FaCheckCircle className="text-success fs-5" />
                        ) : (
                          <FaBan className="text-secondary fs-5" />
                        )}
                      </span>
                      <Dropdown>
                        <Dropdown.Toggle
                          as="div"
                          bsPrefix="p-0"
                          id={`quiz-menu-${quiz._id}`}
                          style={{ cursor: "pointer" }}
                        >
                          <IoEllipsisVertical className="fs-4" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              router.push(
                                `/courses/${cid}/quizzes/${quiz._id}/edit`,
                              )
                            }
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleTogglePublish(quiz)}
                          >
                            {quiz.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  )}
                </Row>
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
