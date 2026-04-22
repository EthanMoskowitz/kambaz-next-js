"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Breadcrumb({
  course,
  quiz,
}: {
  course: { name: string } | undefined;
  quiz?: { title: string };
}) {
  const pathname = usePathname();
  return (
    <span>
      Course {course?.name} &gt;{" "}
      {pathname.includes("quizzes/")
        ? quiz?.title
        : pathname
            .split("/")
            .pop()
            ?.replace(/^\w/, (c) => c.toUpperCase())}
    </span>
  );
}
