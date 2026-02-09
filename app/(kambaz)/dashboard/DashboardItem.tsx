import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
} from "react-bootstrap";

export default function DashboardItem({
  link,
  imgRef,
  imgAlt,
  title,
  description,
}: Readonly<{
  link: string;
  imgRef: string;
  imgAlt: string;
  title: string;
  description: string;
}>) {
  return (
    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
        <Link
          href={link}
          className="wd-dashboard-course-link text-decoration-none text-dark"
        >
          <CardImg
            variant="top"
            src={imgRef}
            width={200}
            height={150}
            alt={imgAlt}
          />
          <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
              {title}
            </CardTitle>
            <CardText
              className="wd-dashboard-course-description overflow-hidden"
              style={{ height: "100px" }}
            >
              {description}
            </CardText>
            <Button variant="primary"> Go </Button>
          </CardBody>
        </Link>
      </Card>
    </Col>
  );
}
