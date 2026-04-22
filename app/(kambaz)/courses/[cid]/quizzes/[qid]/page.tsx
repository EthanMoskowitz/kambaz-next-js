/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { RootState } from "../../../../store";
import * as client from "../client";
import { updateQuiz } from "../reducer";

// Helper function for formatting dates
function formatDate(dateInput?: string | Date) {
  if (!dateInput) return "-";
  const date = new Date(dateInput);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// Reusable component for displaying a label and value in a row
function DetailRow({ label, value }: { label: string; value: any }) {
  return (
    <Row className="mb-2">
      <Col sm={5} className="text-end fw-bold">
        {label}
      </Col>
      <Col sm={7}>{value}</Col>
    </Row>
  );
}

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser,
  );
  const isStudent = currentUser?.role === "STUDENT";

  const [quiz, setQuiz] = useState<any>(null);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  // Fetch quiz details when component mounts or quiz ID changes
  useEffect(() => {
    if (!qid) return;
    client.getQuiz(qid as string).then(setQuiz);
  }, [qid]);

  // For students, fetch their attempts for this quiz to determine score and attempt count
  useEffect(() => {
    if (!qid || !isStudent) return;
    client
      .getMyAttempts(qid as string, currentUser?._id as string)
      .then((attempts) => {
        console.log("My attempts:", attempts);
        setAttemptCount(attempts.length);
        if (attempts.length > 0) {
          setLastAttempt(attempts[attempts.length - 1]);
        }
      });
  }, [qid, isStudent, currentUser?._id]);

  const handleTogglePublish = async (quiz: any) => {
    if (quiz.published) {
      await client.unpublishQuiz(quiz._id);
    } else {
      await client.publishQuiz(quiz._id);
    }
    const updated = { ...quiz, published: !quiz.published };
    setQuiz(updated);
    dispatch(updateQuiz(updated));
  };

  // If quiz data is still loading, show a loading message
  if (!quiz) return <div className="p-3">Loading...</div>;

  const attemptsAllowed = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const canTakeQuiz = isStudent && attemptCount < attemptsAllowed;

  return (
    <div id="wd-quiz-details" className="p-3">
      <div className="d-flex justify-content-end gap-2 mb-4">
        {!isStudent && (
          <>
            <Button
              variant={quiz.published ? "danger" : "success"}
              onClick={() => handleTogglePublish(quiz)}
            >
              {quiz.published ? "Unpublish" : "Publish"}
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                router.push(`/courses/${cid}/quizzes/${qid}/preview`)
              }
            >
              Preview
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
            >
              <FaPencil className="me-1" />
              Edit
            </Button>
          </>
        )}
      </div>

      <h3>{quiz.title}</h3>
      <hr />

      <div className="mt-3" style={{ maxWidth: "640px" }}>
        <DetailRow
          label="Quiz Type"
          value={quiz.quizType?.replace(/_/g, " ")}
        />
        <DetailRow label="Points" value={quiz.points} />
        <DetailRow
          label="Assignment Group"
          value={quiz.assignmentGroup?.replace(/_/g, " ")}
        />
        <DetailRow
          label="Shuffle Answers"
          value={quiz.shuffleAnswers ? "Yes" : "No"}
        />
        <DetailRow
          label="Time Limit"
          value={quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No Time Limit"}
        />
        <DetailRow
          label="Multiple Attempts"
          value={quiz.multipleAttempts ? "Yes" : "No"}
        />
        {quiz.multipleAttempts && (
          <DetailRow label="How Many Attempts" value={quiz.howManyAttempts} />
        )}
        <DetailRow
          label="Show Correct Answers"
          value={quiz.showCorrectAnswers || "Never"}
        />
        <DetailRow label="Access Code" value={quiz.accessCode || "None"} />
        <DetailRow
          label="One Question at a Time"
          value={quiz.oneQuestionAtATime ? "Yes" : "No"}
        />
        <DetailRow
          label="Webcam Required"
          value={quiz.webcamRequired ? "Yes" : "No"}
        />
        <DetailRow
          label="Lock Questions After Answering"
          value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
        />
      </div>

      <hr />

      <Row className="fw-bold border-bottom pb-2 text-center">
        <Col>Due</Col>
        <Col>For</Col>
        <Col>Available From</Col>
        <Col>Until</Col>
      </Row>
      <Row className="text-center pt-2">
        <Col>{formatDate(quiz.dueDate)}</Col>
        <Col>Everyone</Col>
        <Col>{formatDate(quiz.availableDate)}</Col>
        <Col>{formatDate(quiz.untilDate)}</Col>
      </Row>

      {isStudent && (
        <div className="mt-4">
          {lastAttempt && (
            <div className="alert alert-info">
              Last attempt score:{" "}
              <b>
                {lastAttempt.score} / {quiz.points}
              </b>
            </div>
          )}
          {canTakeQuiz ? (
            <Button
              variant="danger"
              onClick={() =>
                router.push(`/courses/${cid}/quizzes/${qid}/preview`)
              }
            >
              {lastAttempt ? "Retake Quiz" : "Start Quiz"}
            </Button>
          ) : (
            <>
              <p className="text-muted">No attempts remaining.</p>
              {quiz.questions.map((q: any) => (
                <div
                  key={q._id}
                  className={`border rounded p-3 mb-3 ${
                    q.correctAnswer ===
                    (lastAttempt?.answers?.find(
                      (a: any) => a.questionId === q._id,
                    )?.answer || "")
                      ? "border-success"
                      : "border-danger"
                  }`}
                >
                  <b>{q.title}</b>
                  <p className="mb-1">
                    <b>{q.question}</b> ({q.points} pts)
                  </p>
                  <p className="mb-0 text-muted">
                    Correct Answer:{" "}
                    {q.type === "MULTIPLE_CHOICE"
                      ? q.choices.find(
                          (ans: any) => ans._id === q.correctAnswer,
                        )?.text || "-"
                      : q.correctAnswer || "-"}
                  </p>
                  <p className="mb-0 text-muted">
                    Your Answer:{" "}
                    {q.type === "MULTIPLE_CHOICE"
                      ? q.choices.find(
                          (ans: any) =>
                            ans._id ===
                            lastAttempt?.answers?.find(
                              (a: any) => a.questionId === q._id,
                            )?.answer,
                        )?.text || "-"
                      : lastAttempt?.answers?.find(
                          (a: any) => a.questionId === q._id,
                        )?.answer || "-"}{" "}
                    {q.correctAnswer ===
                    (lastAttempt?.answers?.find(
                      (a: any) => a.questionId === q._id,
                    )?.answer || "") ? (
                      <span className={`mt-2 fw-bold ${"text-success"}`}>
                        ✓ Correct
                      </span>
                    ) : (
                      <span className={`mt-2 fw-bold ${"text-danger"}`}>
                        ✗ Incorrect
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
