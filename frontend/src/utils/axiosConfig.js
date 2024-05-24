import axios from "axios";
// export const baseUrl = "http://172.16.0.30:8084/api";
// const baseUrl = "https://psmdevapi.kdev.co.in/api";
const baseUrl = "http://localhost:8080/api";

const client = axios.create({ baseURL: baseUrl });

export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "bearer"
  )}`;
  const onSuccess = (response) => response.data;
  const onError = (error) => {
    //error handling (also can redirect to login page , if 401)
    if (error?.response?.data?.error == "jwt malformed") {
      window.location.replace("/login");
    }
    throw error.response;
  };
  console.log(options);
  return client(options).then(onSuccess).catch(onError);
};
