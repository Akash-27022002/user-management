import { useFormik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../apis/user";
import uploadIcon from "../../assets/forms/uploadIcon.svg";
import Button from "../Common/Button";

const UpdateUserProfilePhoto = ({ open, close, email, otp }) => {
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
      file: "",
    },

    onSubmit,
  });

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async ({ data }) => {
      console.log(data);
    },
    onError: async (data) => {
      const x = await data;
      toast.error("Something went wrong");
    },
  });

  const uploadFn = () => {
    const fd = new FormData();
    console.log(values);
    fd.append("image", values.file);
    mutation.mutate(fd);
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
                <p>Update Image</p>
                <p
                  className="absolute left-0 text-red-500 cursor-pointer"
                  onClick={close}
                >
                  Cancel
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="border-[1px] w-full flex relative items-center cursor-pointer gap-3 border-[#424145] border-dashed border-spacing-5 rounded-lg p-3">
                    <img src={uploadIcon} className="w-6" />
                    <p className="text-g-8">Upload Image</p>

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
              </form>
              <Button onClick={() => uploadFn()}>Upload</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUserProfilePhoto;
