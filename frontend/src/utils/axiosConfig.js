import axios from "axios";
// const { API_URL } = process.env
// export const baseUrl = "http://172.16.0.30:8080/api";
// const baseUrl = "https://psmdevapi.kdev.co.in/api";
const baseUrl = "https://user-management-6qh5.onrender.com/api";

const client = axios.create({ baseURL: baseUrl });

export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "bearer"
  )}`;
  const onSuccess = (response) => response.data;
  const onError = (error) => {
    //error handling (also can redirect to login page , if 401)
    if (error?.response?.data?.error == "jwt malformed") {
      window.location.replace("/");
    }
    throw error.response;
  };
  console.log(options);
  return client(options).then(onSuccess).catch(onError);
};
