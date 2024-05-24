import { useFormik } from "formik";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../Components/Common/Button";
import { otpVerify } from "../../apis/auth";
import login from "../../assets/Auth/login.svg";
import { basicSchema } from "../../schemas";

const OtpScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;
  const onSubmit = () => {
    console.log("first", errors);
  };
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });
  const mutation = useMutation({
    mutationFn: otpVerify,
    onSuccess: async (data) => {
      console.log(data);
      navigate(`/userDetail/${data?.id}`);
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
  const [otp, setOtp] = useState("");
  const verifyOtpFn = () => {
    const data = { otp, email };
    mutation.mutate(data);
  };
  return (
    <div className="flex flex-col  h-screen justify-center">
      <div className="grid grid-cols-2 place-content-center h-[500px] w-[60%] mx-auto bg-grey-1 px-10">
        <div className="">
          <img src={login} />
        </div>
        <div className="mx-auto h-full">
          <div className="mx-auto space-y-2">
            <div className="space-y-10">
              <p>Verification</p>
              <p>Please enter the code we sent to {email}</p>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>{"-"}</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="rounded min-w-10 min-h-10 "
                    type="number"
                  />
                )}
              />
              <Button onClick={verifyOtpFn}>Verified OTP</Button>
              <p className="text-blue-1 text-center">Resend</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
