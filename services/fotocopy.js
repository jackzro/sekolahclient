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

export const getFotocopy = () => getRequest(`/fotocopy`);
export const useFotocopy = () => useQuery(["fotocopy"], getFotocopy);

export const createFotocopy = (body) => postRequest(`/fotocopy`, body, false);
export const useCreateFotocopy = () => useMutation(createFotocopy);

export const deleteFotocopy = (id) =>
  postRequest(`/fotocopy/${id}`, null, false, "delete");
export const useDeleteFotocopy = () => useMutation(deleteFotocopy);
export const editFotocopy = (body) =>
  postRequest(`/fotocopy/${body.id}`, body, false, "put");

export const useEditFotocopy = () => useMutation(editFotocopy);
