"use client";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function KambazNavigation() {
  const pathname = usePathname();
  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      <ListGroupItem
        className={
          pathname === "/account/signin" ||
          pathname === "/account/signup" ||
          pathname === "/account/profile"
            ? "border-0 bg-white text-center"
            : "border-0 bg-black text-center"
        }
      >
        <Link
          href="/account"
          id="wd-account-link"
          className={
            pathname === "/account/signin" ||
            pathname === "/account/signup" ||
            pathname === "/account/profile"
              ? "text-danger text-decoration-none"
              : "text-white text-decoration-none"
          }
        >
          <FaRegCircleUser
            className={
              pathname === "/account/signin" ||
              pathname === "/account/signup" ||
              pathname === "/account/profile"
                ? "fs-1 text-danger"
                : "fs-1 text-white"
            }
          />
          <br />
          Account
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={
          pathname === "/dashboard"
            ? "border-0 bg-white text-center"
            : "border-0 bg-black text-center"
        }
      >
        <Link
          href="/dashboard"
          id="wd-dashboard-link"
          className={
            pathname === "/dashboard"
              ? "text-danger text-decoration-none"
              : "text-white text-decoration-none"
          }
        >
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={
          pathname === "/courses" || pathname.startsWith("/courses/")
            ? "border-0 bg-white text-center"
            : "border-0 bg-black text-center"
        }
      >
        <Link
          href="/courses"
          id="wd-courses-link"
          className={
            pathname === "/courses" || pathname.startsWith("/courses/")
              ? "text-danger text-decoration-none"
              : "text-white text-decoration-none"
          }
        >
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          Courses
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={
          pathname === "/calendar"
            ? "border-0 bg-white text-center"
            : "border-0 bg-black text-center"
        }
      >
        <Link
          href="/calendar"
          id="wd-calendar-link"
          className={
            pathname === "/calendar"
              ? "text-danger text-decoration-none"
              : "text-white text-decoration-none"
          }
        >
          <IoCalendarOutline className="fs-1 text-danger" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={
          pathname === "/inbox"
            ? "border-0 bg-white text-center"
            : "border-0 bg-black text-center"
        }
      >
        <Link
          href="/inbox"
          id="wd-inbox-link"
          className={
            pathname === "/inbox"
              ? "text-danger text-decoration-none"
              : "text-white text-decoration-none"
          }
        >
          <FaInbox className="fs-1 text-danger" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>
      <ListGroupItem
        className={
          pathname === "/labs"
            ? "border-0 bg-white text-center"
            : "border-0 bg-black text-center"
        }
      >
        <Link
          href="/labs"
          id="wd-labs-link"
          className={
            pathname === "/labs"
              ? "text-danger text-decoration-none"
              : "text-white text-decoration-none"
          }
        >
          <LiaCogSolid className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
