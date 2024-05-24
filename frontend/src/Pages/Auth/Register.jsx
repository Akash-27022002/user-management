import { useFormik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../Components/Common/Button";
import Input from "../../Components/Common/Input";
import { register } from "../../apis/auth";
import login from "../../assets/Auth/login.svg";
import eyeIcon from "../../assets/forms/eyeIcon.svg";
import uploadIcon from "../../assets/forms/uploadIcon.svg";
import { basicSchema } from "../../schemas";

const Register = () => {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: async ({ data }) => {
      console.log(data);

      // localStorage.setItem("bearer", data?.token?.accessToken);
      // localStorage.setItem("rfToken", data?.token?.refreshToken);
      // localStorage.setItem("email", data?.user?.email);
      // localStorage.setItem("name", data?.user?.name);
      // setUserDetails({agencyId:data?.id,userId:});
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
    console.log("submitted");
    console.log(values);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("company", values.companyName);
    formData.append("name", values.name);
    formData.append("dob", values.dob);
    formData.append("image", values.file);
    mutation.mutate(formData);
  };

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
      password: "",
      confirmPass: "",
      companyName: "",
      name: "",
      dob: "",
      file: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  console.log(errors);
  return (
    <div className="flex flex-col  h-screen justify-center">
      {/* {console.log(first)} */}
      <div className="grid grid-cols-2 place-content-center py-4 min-h-[500px] w-[60%] mx-auto bg-grey-1 px-10">
        <div className="">
          <img src={login} />
        </div>
        <div className="mx-auto h-full">
          <p className="font-semibold mb-4">Sign Up</p>
          <div className="mx-auto space-y-2">
            <form onSubmit={handleSubmit}>
              <div className="space-y-10">
                <div className="space-y-1">
                  <p className="text-[13px]">Email ID</p>
                  <Input
                    placeholder={"Email"}
                    value={values.email}
                    // onChange={onChange}
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`rounded-md py-1 pl-2 pr-32 outline-none h-9 w-full bg-white text-sm text-gray-8 ${
                      errors?.email &&
                      touched?.email &&
                      "outline-double outline-red-800"
                    } `}
                    handleBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-[13px]">{errors.email}</p>
                  )}
                  <p className="text-[13px]">Password</p>
                  <div className={`relative flex `}>
                    <input
                      placeholder={"password"}
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
                      handleBlur={handleBlur}
                      type={showPass ? "text" : "password"}
                    />
                    {/*  */}
                    {/* {value !== null && value != "" && showClear && ( */}

                    <img
                      src={eyeIcon}
                      className="absolute w-5 h-9 right-2 cursor-pointer"
                      onClick={(p) => setShowPass(!p)}
                    />
                    {/* )} */}
                  </div>
                  {errors.password && touched.password && (
                    <p className="text-red-500 w-[250px] text-[13px]">
                      {errors.password}
                    </p>
                  )}
                  <p className="text-[13px]">Confirm Password</p>
                  <div className={`relative flex `}>
                    <input
                      placeholder={"confirmPass"}
                      value={values.confirmPass}
                      // onChange={onChange}
                      id="confirmPass"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`rounded-md py-1 pl-2 pr-32 outline-none h-9 w-full bg-white text-sm text-gray-8 ${
                        errors?.confirmPass &&
                        touched?.confirmPass &&
                        "outline-double outline-red-800"
                      } `}
                      handleBlur={handleBlur}
                      type={showPass ? "text" : "password"}
                    />
                    {/*  */}
                    {/* {value !== null && value != "" && showClear && ( */}

                    <img
                      src={eyeIcon}
                      className="absolute w-5 h-9 right-2 cursor-pointer"
                      onClick={(p) => setShowPass(!p)}
                    />
                    {/* )} */}
                  </div>
                  {errors.confirmPass && touched.confirmPass && (
                    <p className="text-red-500 text-[13px]">
                      {errors.confirmPass}
                    </p>
                  )}
                  <p className="text-[13px]">Company Name</p>
                  <Input
                    placeholder={"companyName"}
                    value={values.companyName}
                    // onChange={onChange}
                    id="companyName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`rounded-md py-1 pl-2 pr-32 outline-none h-9 w-full bg-white text-sm text-gray-8 ${
                      errors?.companyName &&
                      touched?.companyName &&
                      "outline-double outline-red-800"
                    } `}
                    handleBlur={handleBlur}
                  />
                  {errors.companyName && touched.companyName && (
                    <p className="text-red-500 text-[13px]">
                      {errors.companyName}
                    </p>
                  )}
                  <p className="text-[13px]">Name</p>
                  <Input
                    placeholder={"name"}
                    value={values.name}
                    // onChange={onChange}
                    type="text"
                    id="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`rounded-md py-1 pl-2 pr-32 outline-none h-9 w-full bg-white text-sm text-gray-8 ${
                      errors?.name &&
                      touched?.name &&
                      "outline-double outline-red-800"
                    } `}
                    handleBlur={handleBlur}
                    // show={userDetail?.name != ""}
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-[13px]">{errors.name}</p>
                  )}
                  <p className="text-[13px]">DOB</p>
                  <Input
                    placeholder={"DOB"}
                    value={values.dob}
                    // onChange={onChange}
                    type="date"
                    id="dob"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`rounded-md py-1 pl-2 pr-32 outline-none h-9 w-full bg-white text-sm text-gray-8 ${
                      errors?.dob &&
                      touched?.dob &&
                      "outline-double outline-red-800"
                    } `}
                    handleBlur={handleBlur}
                    // show={userDetail?.dob != ""}
                  />
                  {errors.dob && touched.dob && (
                    <p className="text-red-500 text-[13px]">{errors.dob}</p>
                  )}
                  <div className="space-y-2">
                    <label className="border-[1px] w-full flex relative items-center cursor-pointer gap-3 border-[#424145] border-dashed border-spacing-5 rounded-lg p-3">
                      <img src={uploadIcon} className="w-6" />
                      <p className="text-g-8">Upload Logo</p>

                      <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={(event) => {
                          console.log(event.currentTarget.files[0]);
                          setFieldValue("file", event.currentTarget.files[0]);
                        }}
                        className="opacity-0 absolute"
                      />
                      {/* <input
                        type="file"
                        
                        //   onChange={onSelectFile}
                      /> */}
                    </label>
                  </div>
                </div>

                <div className="w-[270px] mx-auto mt-2">
                  <Button type="submit">Sign Up</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
