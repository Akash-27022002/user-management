import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  // age: yup.number().positive().integer().required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        "min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.",
    })
    .required("Required"),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  companyName: yup.string().required("Required"),
  name: yup.string().required(),
  // age: yup
  //   .number("Age Must be Number")
  //   .required("Required")
  //   .integer("Age Must be Number")
  //   .min(14),
  dob: yup.date().min("1900-01-01").required("Required"),
  // image:yup.mixed().required("Required"),
});
export const editSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  // age: yup.number().positive().integer().required("Required"),
  companyName: yup.string().required("Required"),
  name: yup.string().required(),

  dob: yup.date().min("1900-01-01").required("Required"),
  // image:yup.mixed().required("Required"),
});

export const editPassSchema = yup.object().shape({
  oldPassword: yup.string().required("Required"),
  newPassword: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        "min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.",
    })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});
export const forgotPassSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
});

// email: "",
// password: "",
// confirmPass: "",
// companyName: "",
// age: "",
// dob: "",
// image: "",
export const advancedSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .required("Required"),
  jobType: yup
    .string()
    .oneOf(["designer", "developer", "manager", "other"], "Invalid Job Type")
    .required("Required"),
  acceptedTos: yup
    .boolean()
    .oneOf([true], "Please accept the terms of service"),
});
