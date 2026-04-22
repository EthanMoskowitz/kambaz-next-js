/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { RootState } from "../../../../../store";
import * as client from "../../client";

type Phase = "loading" | "taking" | "result" | "no-questions";

// Helper function for grading a quiz attempt locally (used for instructors previewing the quiz)
function gradeLocally(quiz: any, answers: { [qId: string]: string }): number {
  let total = 0;
  for (const question of quiz.questions || []) {
    const submitted = answers[question._id];
    if (!submitted) continue;
    if (question.type === "MULTIPLE_CHOICE" || question.type === "TRUE_FALSE") {
      if (submitted === question.correctAnswer) total += question.points;
    } else if (question.type === "FILL_IN_BLANK") {
      const correct = (question.possibleAnswers || []).some(
        (pa: string) => pa.toLowerCase() === submitted.toLowerCase(),
      );
      if (correct) total += question.points;
    }
  }
  return total;
}

// Helper function to determine if a submitted answer is correct (used for showing results)
function isAnswerCorrect(
  question: any,
  answers: { [qId: string]: string },
): boolean {
  const submitted = answers[question._id];
  if (!submitted) return false;
  if (question.type === "MULTIPLE_CHOICE" || question.type === "TRUE_FALSE") {
    return submitted === question.correctAnswer;
  }
  if (question.type === "FILL_IN_BLANK") {
    return (question.possibleAnswers || []).some(
      (pa: string) => pa.toLowerCase() === submitted.toLowerCase(),
    );
  }
  return false;
}

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser,
  );
  const isStudent = currentUser?.role === "STUDENT";

  const [quiz, setQuiz] = useState<any>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [answers, setAnswers] = useState<{ [qId: string]: string }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);

  // Load quiz details and determine initial phase (taking vs. result) based on attempts and quiz settings
  useEffect(() => {
    if (!qid) return;
    const load = async () => {
      const q = await client.getQuiz(qid as string);
      setQuiz(q);
      if (!(q.questions && q.questions.length > 0)) {
        setPhase("no-questions");
        return;
      }

      if (isStudent) {
        const attempts = await client.getMyAttempts(
          qid as string,
          currentUser?._id as string,
        );
        const attemptsAllowed = q.multipleAttempts ? q.howManyAttempts : 1;
        if (attempts.length >= attemptsAllowed && attempts.length > 0) {
          const last = attempts[attempts.length - 1];
          const ansMap: { [id: string]: string } = {};
          (last.answers || []).forEach((a: any) => {
            ansMap[a.questionId] = a.answer;
          });
          setAnswers(ansMap);
          setScore(last.score);
          setPhase("result");
          return;
        }
      }
      setPhase("taking");
    };
    load();
  }, [qid, isStudent, currentUser?._id]);

  // Handler for updating the answer to a question
  const handleSetAnswer = (questionId: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

  // Handler for submitting the quiz attempt (for students) or grading locally (for instructors)
  const handleSubmit = async () => {
    const answersArray = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      }),
    );

    if (isStudent) {
      const attempt = await client.submitAttempt(
        qid as string,
        cid as string,
        answersArray,
      );
      setScore(attempt.score);
    } else {
      setScore(gradeLocally(quiz, answers));
    }
    setPhase("result");
    setCurrentIndex(0);
  };

  // If quiz has no questions, show a message and for instructors, a button to edit the quiz and add questions
  if (phase === "no-questions")
    return (
      <div className="p-3">
        <div className="alert alert-warning">
          This quiz has no questions yet.
        </div>
        {!isStudent && (
          <Button
            variant="primary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
          >
            Edit Quiz to Add Questions
          </Button>
        )}
      </div>
    );

  // While loading quiz details, show a loading message
  if (!quiz || phase === "loading")
    return <div className="p-3">Loading...</div>;

  const questions: any[] = quiz.questions || [];
  const oneAtATime = quiz.oneQuestionAtATime && phase === "taking";

  // Function to render a single question based on its type, showing correct/incorrect feedback if in result phase
  const renderQuestion = (question: any, idx: number) => {
    const submitted = answers[question._id] || "";
    const correct =
      phase === "result" ? isAnswerCorrect(question, answers) : null;
    const borderClass =
      phase === "result" ? (correct ? "border-success" : "border-danger") : "";

    return (
      <div
        key={question._id}
        className={`border rounded p-3 mb-3 ${borderClass}`}
      >
        <div className="d-flex justify-content-between mb-2">
          <b>Question {idx + 1}</b>
          <span className="text-muted">{question.points} pts</span>
        </div>
        <p>{question.question}</p>

        {question.type === "MULTIPLE_CHOICE" &&
          (question.choices || []).map((choice: any) => (
            <Form.Check
              key={choice._id}
              type="radio"
              id={`choice-${choice._id}`}
              name={`q-${question._id}`}
              label={choice.text}
              checked={submitted === choice._id}
              onChange={() => handleSetAnswer(question._id, choice._id)}
              disabled={phase === "result"}
              className="mb-1"
            />
          ))}

        {question.type === "TRUE_FALSE" &&
          (["true", "false"] as const).map((val) => (
            <Form.Check
              key={val}
              type="radio"
              id={`tf-${question._id}-${val}`}
              name={`q-${question._id}`}
              label={val.charAt(0).toUpperCase() + val.slice(1)}
              checked={submitted === val}
              onChange={() => handleSetAnswer(question._id, val)}
              disabled={phase === "result"}
              className="mb-1"
            />
          ))}

        {question.type === "FILL_IN_BLANK" && (
          <FormControl
            type="text"
            value={submitted}
            placeholder="Your answer"
            onChange={(e) => handleSetAnswer(question._id, e.target.value)}
            disabled={phase === "result"}
            style={{ maxWidth: "320px" }}
          />
        )}

        {phase === "result" && (
          <div
            className={`mt-2 fw-bold ${correct ? "text-success" : "text-danger"}`}
          >
            {correct ? "✓ Correct" : "✗ Incorrect"}
            {!correct && question.type === "MULTIPLE_CHOICE" && (
              <span className="fw-normal text-muted ms-2">
                Correct answer:{" "}
                {
                  (question.choices || []).find(
                    (c: any) => c._id === question.correctAnswer,
                  )?.text
                }
              </span>
            )}
            {!correct && question.type === "TRUE_FALSE" && (
              <span className="fw-normal text-muted ms-2">
                Correct answer:{" "}
                {question.correctAnswer?.charAt(0).toUpperCase() +
                  question.correctAnswer?.slice(1)}
              </span>
            )}
            {!correct && question.type === "FILL_IN_BLANK" && (
              <span className="fw-normal text-muted ms-2">
                Accepted answers: {(question.possibleAnswers || []).join(", ")}
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="wd-quiz-preview" className="p-3">
      {!isStudent && (
        <div className="alert alert-warning py-2">
          This is a preview of the published version of the quiz.
        </div>
      )}

      <h3>{quiz.title}</h3>
      {quiz.description && <p className="text-muted">{quiz.description}</p>}
      <hr />

      {phase === "result" && (
        <div className="alert alert-info">
          Your score:{" "}
          <b>
            {score} / {quiz.points}
          </b>
        </div>
      )}

      {questions.length === 0 && (
        <p className="text-muted">This quiz has no questions yet.</p>
      )}

      {oneAtATime ? (
        <div>
          <div className="d-flex flex-wrap gap-1 mb-3">
            {questions.map((_: any, idx: number) => (
              <Button
                key={idx}
                size="sm"
                variant={idx === currentIndex ? "danger" : "outline-secondary"}
                onClick={() => setCurrentIndex(idx)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
          {renderQuestion(questions[currentIndex], currentIndex)}
          <div className="d-flex justify-content-between mt-2">
            <Button
              variant="secondary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
            >
              &laquo; Previous
            </Button>
            {currentIndex < questions.length - 1 ? (
              <Button
                variant="secondary"
                onClick={() => setCurrentIndex((i) => i + 1)}
              >
                Next &raquo;
              </Button>
            ) : (
              <Button variant="danger" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          {questions.map((q: any, idx: number) => renderQuestion(q, idx))}
          {phase === "taking" && questions.length > 0 && (
            <div className="d-flex justify-content-end mt-2">
              <Button variant="danger" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            </div>
          )}
        </div>
      )}

      {!isStudent && (
        <div className="mt-4 border-top pt-3">
          <Button
            variant="link"
            className="p-0 text-decoration-none"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
          >
            <FaPencil className="me-1" />
            Keep Editing This Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
