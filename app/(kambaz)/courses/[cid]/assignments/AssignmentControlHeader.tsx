import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Badge } from "react-bootstrap";
export default function AssignmentControlHeader() {
  return (
    <div className="float-end">
      <Badge
        pill
        bg="light"
        className="text-black me-2 border border-secondary"
      >
        40% of Total
      </Badge>
      <FaPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
