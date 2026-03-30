/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { setAssignments } from "./reducer";
import { RootState } from "../../../store";
import * as client from "./client";
export default function AssignmentControlButtons({
  assignmentId,
}: {
  assignmentId: any;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer,
  );

  const onDeleteAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(
      setAssignments(assignments.filter((a: any) => a._id !== assignmentId)),
    );
  };
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <BiTrash className="fs-4" onClick={() => setShowDeleteModal(true)} />

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(!showDeleteModal)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Remove this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onDeleteAssignment(assignmentId);
              setShowDeleteModal(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
