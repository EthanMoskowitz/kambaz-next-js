/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  Nav,
  Row,
} from "react-bootstrap";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { updateQuiz as updateQuizAction } from "../../reducer";
import * as client from "../../client";
import QuestionEditor from "./QuestionEditor";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null,
  );
  const [pendingQuestionIds, setPendingQuestionIds] = useState<Set<string>>(
    new Set(),
  );

  // Fetch quiz details when component mounts or quiz ID changes
  useEffect(() => {
    if (!qid) return;
    client.getQuiz(qid as string).then(setQuiz);
  }, [qid]);

  // If quiz data is still loading, show a loading message
  if (!quiz) return <div className="p-3">Loading...</div>;

  // Handler for saving quiz details
  const handleSave = async () => {
    const updated = await client.updateQuiz(qid as string, quiz);
    dispatch(updateQuizAction(updated));
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  // Handler for saving quiz details and publishing
  const handleSaveAndPublish = async () => {
    const updated = await client.updateQuiz(qid as string, quiz);
    await client.publishQuiz(qid as string);
    dispatch(updateQuizAction({ ...updated, published: true }));
    router.push(`/courses/${cid}/quizzes`);
  };

  // Handler for canceling edits and going back to quiz details page
  const handleCancel = () => router.push(`/courses/${cid}/quizzes`);

  // Handler for adding a new question to the quiz
  const handleAddQuestion = () => {
    const newQ = {
      _id: uuidv4(),
      title: "",
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: [
        { _id: uuidv4(), text: "" },
        { _id: uuidv4(), text: "" },
      ],
      correctAnswer: "",
      possibleAnswers: [],
    };
    setQuiz({ ...quiz, questions: [...(quiz.questions || []), newQ] });
    setPendingQuestionIds((prev) => new Set([...prev, newQ._id]));
    setEditingQuestionId(newQ._id);
  };

  // Handler for saving a question (either creating new or updating existing)
  const handleSaveQuestion = async (savedQ: any) => {
    if (pendingQuestionIds.has(savedQ._id)) {
      await client.addQuestion(qid as string, savedQ);
      setPendingQuestionIds((prev) => {
        const next = new Set(prev);
        next.delete(savedQ._id);
        return next;
      });
    } else {
      await client.updateQuestion(qid as string, savedQ._id, savedQ);
    }
    const updated = await client.getQuiz(qid as string);
    setQuiz(updated);
    dispatch(updateQuizAction(updated));
    setEditingQuestionId(null);
  };

  // Handler for deleting a question
  const handleDeleteQuestion = async (questionId: string) => {
    if (pendingQuestionIds.has(questionId)) {
      setQuiz((prev: any) => ({
        ...prev,
        questions: (prev.questions || []).filter(
          (q: any) => q._id !== questionId,
        ),
      }));
      setPendingQuestionIds((prev) => {
        const next = new Set(prev);
        next.delete(questionId);
        return next;
      });
    } else {
      await client.deleteQuestion(qid as string, questionId);
      const updated = await client.getQuiz(qid as string);
      setQuiz(updated);
      dispatch(updateQuizAction(updated));
    }
    if (editingQuestionId === questionId) setEditingQuestionId(null);
  };

  // Action buttons component for saving/canceling edits
  const actionButtons = (includePublish: boolean) => (
    <div className="d-flex justify-content-end gap-2 mt-3">
      <Button variant="secondary" onClick={handleCancel}>
        Cancel
      </Button>
      {includePublish && (
        <Button variant="secondary" onClick={handleSaveAndPublish}>
          Save &amp; Publish
        </Button>
      )}
      <Button variant="danger" onClick={handleSave}>
        Save
      </Button>
    </div>
  );

  return (
    <div id="wd-quiz-editor" className="p-3">
      <div className="d-flex justify-content-end align-items-center mb-3 gap-2">
        <span className="text-muted">Points {quiz.points || 0}</span>
        <span
          className={`badge ${quiz.published ? "bg-success" : "bg-secondary"}`}
        >
          {quiz.published ? "Published" : "Not Published"}
        </span>
      </div>

      <Nav
        variant="tabs"
        className="mb-3"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "details")}
      >
        <Nav.Item>
          <Nav.Link eventKey="details">Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="questions">Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* ── Details Tab ── */}
      {activeTab === "details" && (
        <div>
          <Form.Group className="mb-3">
            <FormControl
              type="text"
              placeholder="Quiz Title"
              value={quiz.title || ""}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <FormLabel>Quiz Instructions:</FormLabel>
            <FormControl
              as="textarea"
              rows={5}
              value={quiz.description || ""}
              placeholder="Quiz instructions..."
              onChange={(e) =>
                setQuiz({ ...quiz, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group as={Row} className="mb-3 align-items-center">
            <FormLabel column sm={3}>
              Quiz Type
            </FormLabel>
            <Col sm={9}>
              <Form.Select
                value={quiz.quizType || "GRADED_QUIZ"}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
              >
                <option value="GRADED_QUIZ">Graded Quiz</option>
                <option value="PRACTICE_QUIZ">Practice Quiz</option>
                <option value="GRADED_SURVEY">Graded Survey</option>
                <option value="UNGRADED_SURVEY">Ungraded Survey</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 align-items-center">
            <FormLabel column sm={3}>
              Assignment Group
            </FormLabel>
            <Col sm={9}>
              <Form.Select
                value={quiz.assignmentGroup || "QUIZZES"}
                onChange={(e) =>
                  setQuiz({ ...quiz, assignmentGroup: e.target.value })
                }
              >
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <fieldset className="border rounded p-3 mb-3">
            <legend className="float-none w-auto px-2 fs-6 fw-bold">
              Options
            </legend>

            <Form.Check
              type="checkbox"
              id="wd-shuffle-answers"
              label="Shuffle Answers"
              className="mb-2"
              checked={quiz.shuffleAnswers ?? true}
              onChange={(e) =>
                setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
              }
            />

            <Row className="align-items-center mb-2">
              <Col className="col-auto">
                <Form.Check
                  type="checkbox"
                  id="wd-time-limit"
                  label="Time Limit"
                  checked={(quiz.timeLimit ?? 0) > 0}
                  onChange={(e) =>
                    setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 })
                  }
                />
              </Col>
              {(quiz.timeLimit ?? 0) > 0 && (
                <Col className="col-auto d-flex align-items-center gap-2">
                  <FormControl
                    type="number"
                    min={1}
                    value={quiz.timeLimit}
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        timeLimit: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                  <span>Minutes</span>
                </Col>
              )}
            </Row>

            <Form.Check
              type="checkbox"
              id="wd-multiple-attempts"
              label="Allow Multiple Attempts"
              className="mb-2"
              checked={quiz.multipleAttempts ?? false}
              onChange={(e) =>
                setQuiz({ ...quiz, multipleAttempts: e.target.checked })
              }
            />
            {quiz.multipleAttempts && (
              <Row className="align-items-center mb-2 ms-3">
                <Col className="col-auto">
                  <FormLabel className="mb-0">How Many Attempts</FormLabel>
                </Col>
                <Col className="col-auto">
                  <FormControl
                    type="number"
                    min={1}
                    value={quiz.howManyAttempts || 1}
                    style={{ width: "80px" }}
                    onChange={(e) =>
                      setQuiz({
                        ...quiz,
                        howManyAttempts: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </Col>
              </Row>
            )}
          </fieldset>

          <Form.Group as={Row} className="mb-3 align-items-center">
            <FormLabel column sm={3}>
              Show Correct Answers
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="text"
                value={quiz.showCorrectAnswers || ""}
                placeholder="e.g. Immediately, After Due Date, Never"
                onChange={(e) =>
                  setQuiz({ ...quiz, showCorrectAnswers: e.target.value })
                }
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 align-items-center">
            <FormLabel column sm={3}>
              Access Code
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="text"
                value={quiz.accessCode || ""}
                placeholder="Leave blank for no access code"
                onChange={(e) =>
                  setQuiz({ ...quiz, accessCode: e.target.value })
                }
              />
            </Col>
          </Form.Group>

          <Form.Check
            type="checkbox"
            id="wd-one-question"
            label="One Question at a Time"
            className="mb-2"
            checked={quiz.oneQuestionAtATime ?? true}
            onChange={(e) =>
              setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
            }
          />

          <Form.Check
            type="checkbox"
            id="wd-webcam"
            label="Webcam Required"
            className="mb-2"
            checked={quiz.webcamRequired ?? false}
            onChange={(e) =>
              setQuiz({ ...quiz, webcamRequired: e.target.checked })
            }
          />

          <Form.Check
            type="checkbox"
            id="wd-lock-questions"
            label="Lock Questions After Answering"
            className="mb-3"
            checked={quiz.lockQuestionsAfterAnswering ?? false}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                lockQuestionsAfterAnswering: e.target.checked,
              })
            }
          />

          <fieldset className="border rounded p-3 mb-3">
            <legend className="float-none w-auto px-2 fs-6 fw-bold">
              Assign
            </legend>
            <Row className="mb-3 align-items-center">
              <Col sm={3}>
                <FormLabel className="fw-bold mb-0">Due</FormLabel>
              </Col>
              <Col sm={9}>
                <FormControl
                  type="date"
                  value={quiz.dueDate ? quiz.dueDate.split("T")[0] : ""}
                  onChange={(e) =>
                    setQuiz({ ...quiz, dueDate: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="mb-3 align-items-center">
              <Col sm={3}>
                <FormLabel className="fw-bold mb-0">Available From</FormLabel>
              </Col>
              <Col sm={9}>
                <FormControl
                  type="date"
                  value={
                    quiz.availableDate ? quiz.availableDate.split("T")[0] : ""
                  }
                  onChange={(e) =>
                    setQuiz({ ...quiz, availableDate: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col sm={3}>
                <FormLabel className="fw-bold mb-0">Until</FormLabel>
              </Col>
              <Col sm={9}>
                <FormControl
                  type="date"
                  value={quiz.untilDate ? quiz.untilDate.split("T")[0] : ""}
                  onChange={(e) =>
                    setQuiz({ ...quiz, untilDate: e.target.value })
                  }
                />
              </Col>
            </Row>
          </fieldset>

          <hr />
          {actionButtons(true)}
        </div>
      )}

      {/* ── Questions Tab ── */}
      {activeTab === "questions" && (
        <div>
          {(quiz.questions || []).length === 0 &&
            editingQuestionId === null && (
              <p className="text-muted text-center py-3">
                No questions yet. Click &ldquo;+ New Question&rdquo; to add one.
              </p>
            )}

          {(quiz.questions || []).map((question: any) =>
            editingQuestionId === question._id ? (
              <div className="mb-3" key={question._id}>
                <QuestionEditor
                  question={question}
                  onSave={handleSaveQuestion}
                  onCancel={() => setEditingQuestionId(null)}
                />
              </div>
            ) : (
              <div
                key={question._id}
                className="border rounded p-3 mb-2 d-flex justify-content-between align-items-center"
              >
                <div>
                  <span className="fw-bold">
                    {question.title || "(Untitled)"}
                  </span>
                  <span className="ms-2 badge bg-secondary">
                    {question.type?.replace(/_/g, " ")}
                  </span>
                  <span className="ms-2 text-muted">{question.points} pts</span>
                </div>
                <div className="d-flex gap-3">
                  <FaPencil
                    style={{ cursor: "pointer" }}
                    onClick={() => setEditingQuestionId(question._id)}
                  />
                  <FaTrash
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteQuestion(question._id)}
                  />
                </div>
              </div>
            ),
          )}

          <div className="d-flex justify-content-center my-3">
            <Button variant="secondary" onClick={handleAddQuestion}>
              <FaPlus className="me-1" />
              New Question
            </Button>
          </div>

          <hr />
          {actionButtons(true)}
        </div>
      )}
    </div>
  );
}
