import request from "@helpers/request";

export const loginRequest = async ({ email, password }) => {
  try {
    const { data: response } = await request.post("/users/login", {
      email,
      password,
    });
    return {
      token: response.access_token,
      payload: response.payload,
    };
  } catch (error) {
    throw error?.response?.data || {};
  }
};
