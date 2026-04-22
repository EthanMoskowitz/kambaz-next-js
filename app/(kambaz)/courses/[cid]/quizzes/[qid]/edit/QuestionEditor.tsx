/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  Row,
} from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

export default function QuestionEditor({
  question,
  onSave,
  onCancel,
}: {
  question: any;
  onSave: (q: any) => void;
  onCancel: () => void;
}) {
  const [q, setQ] = useState<any>(question);

  // Handlers for managing choices and possible answers based on question type
  const addChoice = () =>
    setQ({
      ...q,
      choices: [...(q.choices || []), { _id: uuidv4(), text: "" }],
    });

  // Remove a choice by its ID
  const removeChoice = (id: string) =>
    setQ({ ...q, choices: q.choices.filter((c: any) => c._id !== id) });

  // Update the text of a specific choice
  const updateChoiceText = (id: string, text: string) =>
    setQ({
      ...q,
      choices: q.choices.map((c: any) => (c._id === id ? { ...c, text } : c)),
    });

  // For fill-in-the-blank questions, manage possible answers
  const addPossibleAnswer = () =>
    setQ({ ...q, possibleAnswers: [...(q.possibleAnswers || []), ""] });

  // Remove a possible answer by its index
  const removePossibleAnswer = (idx: number) =>
    setQ({
      ...q,
      possibleAnswers: q.possibleAnswers.filter(
        (_: any, i: number) => i !== idx,
      ),
    });

  // Update a specific possible answer by its index
  const updatePossibleAnswer = (idx: number, val: string) =>
    setQ({
      ...q,
      possibleAnswers: q.possibleAnswers.map((a: string, i: number) =>
        i === idx ? val : a,
      ),
    });

  return (
    <div className="border rounded p-3 bg-white">
      <Row className="mb-3 align-items-center g-2">
        <Col>
          <FormControl
            placeholder="Question Title"
            value={q.title || ""}
            onChange={(e) => setQ({ ...q, title: e.target.value })}
          />
        </Col>
        <Col className="col-auto">
          <Form.Select
            value={q.type}
            onChange={(e) => setQ({ ...q, type: e.target.value })}
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_IN_BLANK">Fill in the Blank</option>
          </Form.Select>
        </Col>
        <Col className="col-auto d-flex align-items-center gap-2">
          <span>pts:</span>
          <FormControl
            type="number"
            min={0}
            value={q.points ?? 1}
            style={{ width: "70px" }}
            onChange={(e) =>
              setQ({ ...q, points: parseInt(e.target.value) || 0 })
            }
          />
        </Col>
      </Row>

      <FormLabel className="fw-bold">Question:</FormLabel>
      <FormControl
        as="textarea"
        rows={3}
        className="mb-3"
        value={q.question || ""}
        placeholder="Enter your question"
        onChange={(e) => setQ({ ...q, question: e.target.value })}
      />

      <FormLabel className="fw-bold">Answers:</FormLabel>

      {q.type === "MULTIPLE_CHOICE" && (
        <>
          {(q.choices || []).map((choice: any) => (
            <Row key={choice._id} className="align-items-center mb-2 g-2">
              <Col className="col-auto">
                <Form.Check
                  type="radio"
                  name={`correct-${q._id}`}
                  checked={q.correctAnswer === choice._id}
                  onChange={() => setQ({ ...q, correctAnswer: choice._id })}
                  title="Mark as correct answer"
                />
              </Col>
              <Col>
                <FormControl
                  value={choice.text}
                  placeholder="Possible Answer"
                  onChange={(e) => updateChoiceText(choice._id, e.target.value)}
                />
              </Col>
              <Col className="col-auto">
                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeChoice(choice._id)}
                />
              </Col>
            </Row>
          ))}
          <Button variant="link" size="sm" className="p-0" onClick={addChoice}>
            <FaPlus className="me-1" />
            Add Another Answer
          </Button>
        </>
      )}

      {q.type === "TRUE_FALSE" && (
        <>
          {(["true", "false"] as const).map((val) => (
            <Row key={val} className="align-items-center mb-2">
              <Col className="col-auto">
                <Form.Check
                  type="radio"
                  name={`tf-${q._id}`}
                  checked={q.correctAnswer === val}
                  onChange={() => setQ({ ...q, correctAnswer: val })}
                />
              </Col>
              <Col className="text-capitalize">{val}</Col>
            </Row>
          ))}
        </>
      )}

      {q.type === "FILL_IN_BLANK" && (
        <>
          {(q.possibleAnswers || []).map((ans: string, idx: number) => (
            <Row key={idx} className="align-items-center mb-2 g-2">
              <Col>
                <FormControl
                  value={ans}
                  placeholder="Possible Answer"
                  onChange={(e) => updatePossibleAnswer(idx, e.target.value)}
                />
              </Col>
              <Col className="col-auto">
                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => removePossibleAnswer(idx)}
                />
              </Col>
            </Row>
          ))}
          <Button
            variant="link"
            size="sm"
            className="p-0"
            onClick={addPossibleAnswer}
          >
            <FaPlus className="me-1" />
            Add Another Answer
          </Button>
        </>
      )}

      <div className="mt-3 d-flex gap-2 justify-content-end border-top pt-3">
        <Button variant="secondary" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" size="sm" onClick={() => onSave(q)}>
          Update Question
        </Button>
      </div>
    </div>
  );
}
