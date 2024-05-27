import { useFormik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Common/Button";
import InputCross from "../../Components/Common/Input";
import ForgotPassword from "../../Components/Modals/ForgotPassword";
import { loginUser } from "../../apis/auth";
import login from "../../assets/Auth/login.svg";
import or from "../../assets/Auth/or.svg";
import eyeIcon from "../../assets/forms/eyeIcon.svg";

const Login = () => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      console.log(data);
      navigate("/otp", { state: { email: values.email } });
    },
    onError: async (data) => {
      const x = await data;
      toast.error("Something went wrong");
      if (x?.data?.error) {
        toast.error(x?.data?.error ?? "Something Went Wrong");
        return;
      }
    },
  });
  const onSubmit = () => {
    console.log("first", errors);
    const data = { email: values.email, password: values.password };
    mutation.mutate(data);
  };
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      // validationSchema: basicSchema,
      onSubmit,
    });
  console.log(errors);
  return (
    <div className="flex flex-col  h-screen justify-center">
      <div className="grid grid-cols-2 place-content-center h-[500px] w-[60%] mx-auto bg-grey-1 px-10">
        <div className="">
          <img src={login} />
        </div>
        <div className="mx-auto h-full">
          <div className="mx-auto space-y-2">
            <div className="space-y-10">
              <form onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <p className="text-[13px]">Email ID</p>
                  {/* <input
                    value={values.email}
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  /> */}
                  <InputCross
                    placeholder={"Email"}
                    value={values.email}
                    id="email"
                    onChange={handleChange}
                    className={`${
                      errors?.email &&
                      touched?.email &&
                      "outline-double outline-red-800"
                    }`}
                    onBlur={handleBlur}
                    // value={userDetail?.email}
                    // onChange={(e) =>
                    //   setUserDetail({ ...userDetail, email: e.target.value })
                    // }
                    // empty={() => setUserDetail({ ...userDetail, email: "" })}
                    // show={userDetail?.email != ""}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-[13px]">{errors.email}</p>
                  )}
                  <p className="text-[13px]">Password</p>
                  <div className={`relative flex `}>
                    <input
                      value={values.password}
                      // onChange={onChange}
                      id="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`rounded-md py-1 pl-2 pr-32 outline-none h-9 w-full bg-white text-sm text-gray-8 ${
                        errors?.password &&
                        touched?.password &&
                        "outline-double outline-red-800"
                      } `}
                      // placeholder={placeholder}
                      // onKeyDown={onKeyDown}
                      handleBlur={handleBlur}
                      maxLength={51}
                      type={showPass ? "text" : "password"}
                    />

                    {/*  */}
                    {/* {value !== null && value != "" && showClear && ( */}

                    <img
                      src={eyeIcon}
                      className="absolute w-5 h-9 right-2 cursor-pointer"
                      onClick={() => setShowPass((p) => !p)}
                    />
                    {/* )} */}
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-[13px]">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="w-[270px] mx-auto mt-2">
                  <Button type="submit">Login</Button>
                </div>
                {/* <button type="submit">Submit</button> */}
              </form>
            </div>

            <div className="space-y-2">
              <div className="">
                <p
                  className="text-[13px] text-blue-1 text-center cursor-pointer"
                  onClick={() => setOpenForgotPassword(true)}
                >
                  Forgot Password
                </p>
              </div>
              <img src={or} />
              <div className="">
                <p className="text-[13px] text-blue-1 text-center cursor-pointer">
                  Create An Account
                </p>
              </div>
              <div
                className="w-[270px] mx-auto"
                onClick={() => navigate("/register")}
              >
                <Button className={"bg-none border-[1px] border-blue-1 "}>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openForgotPassword && (
        <ForgotPassword
          open={openForgotPassword}
          close={() => setOpenForgotPassword(false)}
        />
      )}
    </div>
  );
};

export default Login;
