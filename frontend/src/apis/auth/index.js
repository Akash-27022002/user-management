import { request } from "../../utils/axiosConfig";

export const register = (data) => {
  const result = request({
    url: "/auth/account",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data,
  });
  return result;
};
export const otpVerify = (data) => {
  const result = request({
    url: "/auth/otp",
    method: "post",
    data: {
      otp: data?.otp,
      // email: data?.email,
      email: data?.email,
    },
  });
  return result;
};

export const logout = (data) => {
  const result = request({
    url: "/auth/logout",
    method: "post",
  });
  localStorage.clear();
  console.log(result);
  return result;
};

export const loginUser = (data) => {
  const result = request({
    url: "/auth/login",
    method: "post",
    data,
  });
  return result;
};

export const forgotPassword = ({ email }) => {
  console.log(email);
  const result = request({
    url: "/auth/forgotPassword",
    method: "post",
    data: { email: email },
  });
  return result;
};
export const forgotPassWithOtp = ({ email, password, otp }) => {
  console.log(email, otp);
  const result = request({
    url: "/auth/forgotPassword",
    method: "patch",
    data: { email, otp, password },
  });
  return result;
};
