/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid, qid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const quiz = quizzes.find((quiz: any) => quiz._id === qid);
  const [showNavigation, setShowNavigation] = useState<boolean>(true);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNavigation(!showNavigation)}
        />
        <Breadcrumb course={course} quiz={quiz} />
      </h2>
      <hr />
      <div className="d-flex">
        {showNavigation && (
          <div className="d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
