import { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "./store";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <Button onClick={addElement} variant="success">
        Add Element
      </Button>
      <ListGroup>
        {array.map((item, index) => (
          <ListGroupItem key={index} className="d-flex justify-content-between">
            <span className="font-bold">{item}</span>
            <Button onClick={() => deleteElement(index)} variant="danger">
              Delete
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
