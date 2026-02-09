import { Button, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
export default function AssignmentControl() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <div className="float-start">
        <InputGroup className="mb-3 float-end" id="wd-search-assignment">
          <InputGroupText id="wd-search-assignment-icon">
            <CiSearch />
          </InputGroupText>
          <FormControl
            placeholder="Search..."
            id="wd-search-assignment"
            type="text"
          />
        </InputGroup>
      </div>
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
      >
        <FaPlus />
        Assignment
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-view-progress"
      >
        <FaPlus />
        Group
      </Button>
    </div>
  );
}
