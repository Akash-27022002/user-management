import { request } from "../../utils/axiosConfig";

export const getUserDetails = (data) => {
  const result = request({
    url: `/user/${data}`,
    method: "get",
  });
  return result;
};
export const updateUser = (data) => {
  console.log(data);
  const result = request({
    url: `/user/${data.id}`,
    method: "patch",
    data: {
      company: data?.company,
      dob: data?.dob,
      name: data?.name,
    },
  });
  return result;
};
export const updateUserProfile = (data) => {
  console.log(data);
  const result = request({
    url: `/user/u/${data?.id}`,
    method: "patch",
    headers: { "Content-Type": "multipart/form-data" },
    data: {
      image: data?.data,
    },
  });
  return result;
};

export const deleteUser = (data) => {
  const result = request({
    url: `/user/${data.id}`,
    method: "delete",
  });
  return result;
};

export const updateUserPassword = (data) => {
  console.log(data);
  const { newPassword, oldPassword, id } = data;
  const result = request({
    url: `/user/${id}`,
    method: "post",

    data: { newPassword, oldPassword },
  });
  return result;
};
