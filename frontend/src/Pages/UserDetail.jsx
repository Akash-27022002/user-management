import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Components/Common/Button";

import { useFormik } from "formik";
import InputCross from "../Components/Common/Input";
import UpdatePassword from "../Components/Modals/UpdatePassword";
import UpdateUserProfilePhoto from "../Components/Modals/UpdateProfilePhoto";
import { logout } from "../apis/auth";
import { getUserDetails, updateUser, updateUserProfile } from "../apis/user";
import { editSchema } from "../schemas";

const UserDetail = () => {
  const params = useParams();
  const userId = params.userId;
  const [updatePasswordDialog, setUpdatePasswordDialog] = useState(false);
  const [updateProfilePhotoModal, setUpdateProfileModal] = useState(false);
  const { data, isLoading, isRefetching } = useQuery(
    ["user", userId],
    () => getUserDetails(userId),
    {
      select: (data) => {
        return data.data;
      },
    }
  );
  console.log(data);
  const onSubmit = () => {
    console.log(values);
  };
  console.log(data);
  const navigate = useNavigate();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      name: data?.name,
      dob: data?.dob,
      company: data?.company,
      file: "",
    },
    enableReinitialize: true,
    validationSchema: editSchema,
    onSubmit,
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const mutationLogout = useMutation({
    mutationFn: logout,
    onSuccess: async ({ data }) => {
      console.log(data);
      navigate("/login");
    },
    onError: async (data) => {
      const x = await data;
      toast.error("Something went wrong");
    },
  });

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: async ({ data }) => {
      console.log(data);
    },
    onError: async (data) => {
      const x = await data;
      toast.error("Something went wrong");
    },
  });

  const mutationEditDp = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async ({ data }) => {
      console.log(data);
    },
    onError: async (data) => {
      const x = await data;
      toast.error("Something went wrong");
    },
  });
  const handleEdit = () => {
    if (isDisabled) {
      setIsDisabled(false);
      return;
    } else {
      //save user
      const data = {
        name: values.name,
        company: values.company,
        dob: values.dob,
        id: params.userId,
      };
      mutation.mutate(data);

      setIsDisabled(true);
    }
  };
  useEffect(() => {
    console.log("first", values);
    const fd = new FormData();
    fd.append("image", values.file);
    mutationEditDp.mutate({ id: params.userId, data: fd });
  }, [values.file]);

  return (
    <div className="w-full bg-grey-1 min-h-screen  flex flex-col justify-center relative ">
      <div className="w-[10%] top-10 right-10 mr-10 absolute">
        <Button
          onClick={() => {
            console.log("asd");
            mutationLogout.mutate({});
          }}
        >
          Logout
        </Button>
      </div>
      <div className="w-[40%] space-y-10 mx-auto">
        <div className="flex flex-col  gap-4 ">
          <p className="self-center relative">
            <img
              src={`data:image/jpeg;base64,${data?.image}`}
              className="w-20 h-20 rounded-full border-[1px] border-black "
            />
            {/* <label
              className="absolute right-0 bottom-0"
              onClick={() => {
                setUpdateProfileModal(true);
              }}
            >
              P
              <input
                // type="file"
                className="hidden"
                id="file"
                name="file"
                // onChange={async (event) => {
                //   console.log(event?.currentTarget?.files[0]);
                //   console.log(values);
                //   setUpdateProfileModal(true);
                //   setFieldValue("file", event?.currentTarget?.files[0]);
                //   console.log(values);
                //   //edit profile image
                //   const res = await event?.currentTarget?.files[0];
                //   // fd.append("image", res);
                //   // formData.append("image", values.file);

                //   // if (confirm("Do you want to upload this image?")) {
                //   //   mutationEditDp.mutate({
                //   //     id: params.userId,
                //   //     data: values.image,
                //   //   });
                //   // }
                //   // mutationEditDp.mutate({ id: params.userId, data: fd });
                // }}
              />
            </label> */}

            {/* <img src={data?.image} /> */}
          </p>
          <InputCross
            value={values?.name}
            disabled={isDisabled}
            onChange={handleChange}
            id="name"
            onBlur={handleBlur}
            right={"Username"}
            className={`${
              errors?.name && touched?.name && "outline-double outline-red-800"
            } `}
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-[13px]">{errors.name}</p>
          )}
          <InputCross value={data?.email} disabled={true} right={"Email"} />
          <InputCross
            value={data?.dob?.split("T")[0]}
            onBlur={handleBlur}
            disabled={isDisabled}
            type="date"
            onChange={handleChange}
            right={"DOB"}
            className={`${
              errors?.dob && touched?.dob && "outline-double outline-red-800"
            } `}
          />
          {errors.dob && touched.dob && (
            <p className="text-red-500 text-[13px]">{errors.dob}</p>
          )}
          <InputCross
            value={data?.company}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isDisabled}
            right={"Company"}
            className={`${
              errors?.company &&
              touched?.company &&
              "outline-double outline-red-800"
            } `}
          />
          {errors.company && touched.company && (
            <p className="text-red-500 text-[13px]">{errors.company}</p>
          )}
        </div>
        <div
          className="w-[80%] mx-auto"
          onClick={() => {
            handleEdit();
          }}
        >
          <Button className={"bg-blue-1"}>
            {isDisabled ? "Edit Account" : "Save Account"}
          </Button>
        </div>
        <div className="w-[80%] mx-auto">
          <Button
            className={"bg-emerald-400"}
            onClick={() => {
              setUpdatePasswordDialog(true);
            }}
          >
            Update Password
          </Button>
        </div>
        <div className="w-[80%] mx-auto">
          <Button className={"bg-red-500"}>Delete Account</Button>
        </div>
      </div>
      <UpdatePassword
        open={updatePasswordDialog}
        close={() => setUpdatePasswordDialog(false)}
      />
      <UpdateUserProfilePhoto
        open={updateProfilePhotoModal}
        close={() => {
          setUpdateProfileModal(false);
        }}
      />
    </div>
  );
};

export default UserDetail;
