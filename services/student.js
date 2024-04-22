import { useQuery, useMutation } from "react-query";
import request from "@helpers/request";

const getRequest = async (endpoint, params) => {
  try {
    const { data: response } = await request.get(endpoint, { params });
    return response;
  } catch (error) {
    throw error?.response?.data || {};
  }
};

const postRequest = async (
  endpoint,
  body,
  isFormData = false,
  method = "post"
) => {
  let payload;
  if (endpoint === "/students/unit") {
    if (body === "KB&TK MARIA YACHINTA") {
      payload = { unit: "KB/TK MARIA YACHINTA" };
    } else {
      payload = { unit: body };
    }
  } else {
    payload = body;
  }

  if (isFormData) {
    payload = new FormData();
    Object.keys(body).forEach((key) => {
      payload.append(key, body[key]);
    });
  }
  try {
    const { data: response } = await request[method](endpoint, payload);
    return response;
  } catch (error) {
    throw error?.response?.data || {};
  }
};

export const getAllStudent = () => getRequest("/students");
export const postAllStudentByUnit = (body) =>
  postRequest("/students/unit", body);
export const getStudentById = (id) => getRequest(`/students/${id}`);
export const getStudentPaymentById = (id) =>
  getRequest(`/students/payment/${id}`);
export const getDetailStudentPaymentById = (id) =>
  getRequest(`/students/payment/detail/${id}`);
export const getGroupByPeriod = (id) =>
  getRequest(`/students/payment/period/${id}`);

// export const getBikinExcelBca = () => getRequest(`/students/createFile`);
export const postBikinExcelBca = (body) =>
  postRequest(`/students/createFile`, body, false);
export const postEditStudent = (body) =>
  postRequest(`/students/${body.id}`, body, false, "patch");
export const updateStatusPayment = (body) =>
  postRequest(`/students/updatePaymentStatus`, body, false);
export const laporan = (body) => postRequest(`/students/laporan`, body, false);
export const laporanUnit = (body) =>
  postRequest(`/students/laporan/unit`, body, false);
export const updateStatusPaymentViaFile = (body) =>
  postRequest(`/students/updatePaymentStatusViaFIle`, body, false);
export const postToGetID = (body) =>
  postRequest(`/students/unit/length`, body, false);
export const postAddStudent = (body) =>
  postRequest(`/students/addStudent`, body, false);
export const deleteStudentPaymentById = (body) =>
  postRequest(`/students/payment/delete`, body, false);
export const deleteStudent = (id) =>
  postRequest(`/students/${id}`, null, false, "delete");
export const updateUangSekolah = (body) => {
  postRequest(`/students/payment/uangsekolah/${body.id}`, body, false, "patch");
};
export const updateStatusDenda = (body) => {
  postRequest(`/students/uangDenda/${body.id}`, body, false, "patch");
};
export const batalPayment = (body) => {
  postRequest(`/students/payment/status`, body, false);
};
//react-query hooks

export const useStudents = () => useQuery("students", getAllStudent);
// export const useBikinExcelBca = () => useQuery("create-file", getBikinExcelBca);
export const useStudentByUnit = (unit) =>
  useQuery(["student-by-unit", unit], () => postAllStudentByUnit(unit));
export const useStudentById = (id) =>
  useQuery(["student-by-id", id], () => getStudentById(id));
export const usePaymentStudentById = (id) =>
  useQuery(["payment-student-by-id", id], () => getStudentPaymentById(id));
export const useDetailPaymentStudentById = (id) =>
  useQuery(["detail-payment-student-by-id", id], () =>
    getDetailStudentPaymentById(id)
  );
export const useGroupByPeriod = (id) =>
  useQuery(["group-by-period", id], () => getGroupByPeriod(id));

export const useBikinExcelBca = () => useMutation(postBikinExcelBca);
export const useDeleteStudentPaymentById = () =>
  useMutation(deleteStudentPaymentById);
export const useEditStudent = () => useMutation(postEditStudent);
export const useUpdateStatusPayment = () => useMutation(updateStatusPayment);
export const useLaporan = () => useMutation(laporan);
export const useLaporanUnit = () => useMutation(laporanUnit);
export const useUpdateStatusPaymentViaFile = () =>
  useMutation(updateStatusPaymentViaFile);
export const useToGetID = () => useMutation(postToGetID);
export const useAddStudent = () => useMutation(postAddStudent);
export const useDeleteStudent = () => useMutation(deleteStudent);
export const useUpdateUangSekolah = () => useMutation(updateUangSekolah);
export const useUpdateStatusDenda = () => useMutation(updateStatusDenda);
export const useBatalPayment = () => useMutation(batalPayment);
