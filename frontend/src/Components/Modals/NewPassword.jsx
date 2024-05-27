import { useFormik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassWithOtp } from "../../apis/auth";
import { editPassSchema } from "../../schemas";
import Button from "../Common/Button";
import InputCross from "../Common/Input";

const NewPassword = ({ open, close, email, otp }) => {
  const onSubmit = () => {
    console.log("first");
  };
  const params = useParams();
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
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: editPassSchema,

    onSubmit,
  });

  const mutation = useMutation({
    mutationFn: forgotPassWithOtp,
    onSuccess: async (data) => {
      console.log(data);
      close();
      navigate("/");
    },
    onError: async (data) => {
      const x = await data;
      toast.error("Something went wrong");
    },
  });
  const updatePasswordFn = () => {
    console.log("first");
    mutation.mutate({ email: email, password: values.newPassword, otp });
  };
  return (
    <>
      {open && (
        <div
          className={`fixed inset-0 bg-[#8D8D8D] z-50 bg-opacity-50 w-full h-full flex`}
        >
          <div className="flex justify-center items-center w-full">
            <div className="bg-[#F2F2F7] flex flex-col gap-6  w-[530px] min-h-[205px] rounded-2xl p-4 relative">
              <div className="flex justify-center relative w-full">
                <p>Update Password</p>
                <p
                  className="absolute left-0 text-red-500 cursor-pointer"
                  onClick={close}
                >
                  Cancel
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <InputCross
                    placeholder={"New Password"}
                    value={values.newPassword}
                    // onChange={onChange}
                    id="newPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${
                      errors?.newPassword &&
                      touched?.newPassword &&
                      "outline-double outline-red-800"
                    } `}
                    handleBlur={handleBlur}
                  />
                  {errors.newPassword && touched.newPassword && (
                    <p className="text-red-500 text-[13px]">
                      {errors.newPassword}
                    </p>
                  )}
                  <InputCross
                    placeholder={"Confirm Password"}
                    value={values.confirmPassword}
                    // onChange={onChange}
                    id="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${
                      errors?.confirmPassword &&
                      touched?.confirmPassword &&
                      "outline-double outline-red-800"
                    } `}
                    handleBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-red-500 text-[13px]">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
                <div
                  className="w-[50%] mx-auto mt-4"
                  onClick={() => {
                    updatePasswordFn();
                  }}
                >
                  <Button type="submit">Update Password</Button>
                </div>
                {/* <div className="bg-emerald-500 inset-0 absolute">Hello</div> */}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPassword;
