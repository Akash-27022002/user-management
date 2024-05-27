import { useFormik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../../apis/auth";
import { forgotPassSchema } from "../../schemas";
import Button from "../Common/Button";
import InputCross from "../Common/Input";

const ForgotPassword = ({ open, close }) => {
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
      email: "",
    },
    validationSchema: forgotPassSchema,

    onSubmit,
  });

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: async (data) => {
      console.log(data);
      close();
      navigate("/otp", {
        state: { email: values.email, calledFrom: "forgotPassword" },
      });
    },
    onError: async (data) => {
      const x = await data;
      toast.error("Something went wrong");
    },
  });
  const updatePasswordFn = () => {
    mutation.mutate({ email: values?.email });
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
                <p>Forgot Password</p>
                <p
                  className="absolute left-0 text-red-500 cursor-pointer"
                  onClick={close}
                >
                  Cancel
                </p>
              </div>
              {
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <InputCross
                      placeholder={"Enter Email"}
                      value={values.email}
                      // onChange={onChange}
                      id="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${
                        errors?.email &&
                        touched?.email &&
                        "outline-double outline-red-800"
                      } `}
                      handleBlur={handleBlur}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-[13px]">{errors.email}</p>
                    )}
                  </div>
                  <div
                    className="w-[50%] mx-auto mt-4"
                    onClick={() => {
                      updatePasswordFn();
                    }}
                  >
                    <Button type="submit">Send Otp</Button>
                  </div>
                  {/* <div className="bg-emerald-500 inset-0 absolute">Hello</div> */}
                </form>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
