import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const fetchCoursesForEnrolledUser = async (userId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/users/${userId}/courses`,
  );
  return response.data;
};

export const fetchUsersForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${ENROLLMENTS_API}/${courseId}/users`,
  );
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${ENROLLMENTS_API}/${userId}/courses/${courseId}`,
  );
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${ENROLLMENTS_API}/${userId}/courses/${courseId}`,
  );
  return response.data;
};
