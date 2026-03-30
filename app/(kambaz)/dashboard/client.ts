import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const fetchEnrollments = async () => {
  const response = await axiosWithCredentials.get(ENROLLMENTS_API);
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const enrollInCourse = async (enrollment: any) => {
  const response = await axiosWithCredentials.post(ENROLLMENTS_API, enrollment);
  return response.data;
};

export const unenrollFromCourse = async (enrollmentId: string) => {
  const response = await axiosWithCredentials.delete(`${ENROLLMENTS_API}`, {
    data: { _id: enrollmentId },
  });
  return response.data;
};
