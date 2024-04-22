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

export const getUangDendaById = (id) => getRequest(`/payments/${id}`);

export const useUangDendaById = (id) =>
  useQuery(["uangdenda-by-id", id], () => getUangDendaById(id));

export const createUangKegiatan = (body) =>
  postRequest(`/students/create/uangKegiatan`, body, false);
export const createUangKegiatanByIdSiswa = (body) =>
  postRequest(`/students/create/id/uangkegiatan`, body, false);
export const createUangUjian = (body) =>
  postRequest(`/students/create/uangUjian`, body, false);
export const createUangLainnya = (body) =>
  postRequest(`/students/create/uangLainnya`, body, false);
export const createUangLainnyaByIdSiswa = (body) =>
  postRequest(`/students/create/id/uangLainnya`, body, false);
export const updateExcelPayment = (body) =>
  postRequest(`/students/updateExcel/payment`, body, false);
export const countIncome = (body) =>
  postRequest(`/payments/income`, body, false);
export const editPaymentById = (body) =>
  postRequest(`/payments/${body.id}`, body, false);
export const updateJumlahTagihan = (body) =>
  postRequest(`/payments/updateJumlahTagihan`, body, false);
export const createDeposit = (body) => postRequest(`/deposits`, body, false);

export const useCreateUangKegiatan = () => useMutation(createUangKegiatan);
export const useCreateUangKegiatanByIdSiswa = () =>
  useMutation(createUangKegiatanByIdSiswa);
export const useCreateUangUjian = () => useMutation(createUangUjian);
export const useCreateUangLainnya = () => useMutation(createUangLainnya);
export const useCreateUangLainnyaByIdSiswa = () =>
  useMutation(createUangLainnyaByIdSiswa);
export const useUpdateExcelPayment = () => useMutation(updateExcelPayment);
export const useCountIncome = () => useMutation(countIncome);
export const useEditPaymentById = () => useMutation(editPaymentById);
export const useUpdateJumlahTagihan = () => useMutation(updateJumlahTagihan);
export const useCreateDeposit = () => useMutation(createDeposit);
