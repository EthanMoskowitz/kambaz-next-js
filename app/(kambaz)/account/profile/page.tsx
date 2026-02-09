import Link from "next/link";
import { Col, Container, FormControl, FormSelect, Row } from "react-bootstrap";
export default function Profile() {
  return (
    <Container className="border border-2 border-dark rounded-3 p-4 mt-4">
      <Row>
        <Col>
          <h3>Profile</h3>
          <FormControl
            defaultValue="alice"
            placeholder="username"
            className="wd-username"
          />
          <FormControl
            defaultValue="123"
            placeholder="password"
            type="password"
            className="wd-password"
          />
          <FormControl
            defaultValue="Alice"
            placeholder="First Name"
            id="wd-firstname"
          />
          <FormControl
            defaultValue="Wonderland"
            placeholder="Last Name"
            id="wd-lastname"
          />
          <FormControl defaultValue="2000-01-01" type="date" id="wd-dob" />
          <FormControl
            defaultValue="alice@wonderland"
            type="email"
            id="wd-email"
          />
          <FormSelect defaultValue="FACULTY" id="wd-role">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </FormSelect>
          <Link href="signin" className="btn btn-danger w-100 mb-2">
            Sign out
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
