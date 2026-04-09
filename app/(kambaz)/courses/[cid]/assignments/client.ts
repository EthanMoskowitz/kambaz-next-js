/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
export const fetchAssignments = async (courseID: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseID}/assignments`,
  );
  console.log("Fetched assignments for course", response.data);
  return response.data;
};

export const createAssignmentForCourse = async (
  courseID: string,
  assignment: any,
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseID}/assignments`,
    assignment,
  );
  return response.data;
};

export const updateAssignment = async (courseID: string, assignment: any) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${courseID}/assignments/${assignment._id}`,
    assignment,
  );
  return response.data;
};

export const deleteAssignment = async (
  courseID: string,
  assignmentID: string,
) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseID}/assignments/${assignmentID}`,
  );
  return response.data;
};
