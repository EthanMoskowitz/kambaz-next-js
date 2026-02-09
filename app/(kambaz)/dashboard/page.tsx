import Link from "next/link";
import Image from "next/image";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "react-bootstrap";
import DashboardItem from "./DashboardItem";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <DashboardItem
            link="/courses/1234"
            imgRef="/images/reactjs.jpg"
            imgAlt="reactjs"
            title="CS1234 React JS"
            description="Full Stack software developer"
          />
          <DashboardItem
            link="/courses/1365"
            imgRef="/images/math.jpg"
            imgAlt="math"
            title="MATH1365"
            description="Introduction to Math Reasoning"
          />
          <DashboardItem
            link="/courses/1134"
            imgRef="/images/guitar.jpg"
            imgAlt="guitar"
            title="MUSC1134 Guitar Class"
            description="Guitar Class"
          />
          <DashboardItem
            link="/courses/1001"
            imgRef="/images/music.jpg"
            imgAlt="music"
            title="MUSC1001 Music in Everyday Life"
            description="Music in Everyday Life"
          />
          <DashboardItem
            link="/courses/1145"
            imgRef="/images/values.jpg"
            imgAlt="philosophy"
            title="PHIL1145 Technology and Human Values"
            description="Technology and Human Values"
          />
          <DashboardItem
            link="/courses/1101"
            imgRef="/images/communication.jpg"
            imgAlt="communication"
            title="COMM1101 Intro Communication Studies"
            description="Intro Communication Studies"
          />
          <DashboardItem
            link="/courses/1112"
            imgRef="/images/speaking.jpg"
            imgAlt="speaking"
            title="COMM1112 Public Speaking"
            description="Public Speaking"
          />
        </Row>
      </div>
    </div>
  );
}
