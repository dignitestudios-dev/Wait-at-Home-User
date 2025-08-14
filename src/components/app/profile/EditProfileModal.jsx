import React, { useContext, useState } from "react";
import { Alert, Clock, UserPro } from "../../../assets/export";
import { RxCross2 } from "react-icons/rx";
import GlobalInputs from "../../global/GlobalInputs";
import { useFormik } from "formik";
import { EditProfile } from "../../../init/app/EditProfile";
import { EditProfileSchema } from "../../../schema/authentication/EditProfileSchema";
import GlobalButton from "../../global/GlobalButton";
import PhoneInputs from "../../global/PhoneInput";
import { phoneFormater } from "../../../lib/helpers";
import { ErrorToast, SuccessToast } from "../../global/Toaster";
import axios from "../../../axios";
import { AppContext } from "../../../context/AppContext";
const EditProfileModal = ({
  isOpen,
  onClose,
  setUpdatedEdit,
  setEditModal,
  userProfileData,
  setUpdate,
}) => {
  if (!isOpen) return null;
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { Auth } = useContext(AppContext);
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userProfileData?.name || "",
      email: userProfileData?.email || "",
      phone: userProfileData?.phone || "",
    },
    validationSchema: EditProfileSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        if (values.profilePic) {
          formData.append("profilePic", values.profilePic);
        }

        const response = await axios.post(
          "/user/update-user-profile",
          formData
        );
        if (response.status === 200) {
          SuccessToast(response?.data?.message);
          Auth({ data: { user: response.data.data } });
          setEditModal(false);
          setUpdate((prev) => !prev);
          setUpdatedEdit(true);
        }
      } catch (error) {
        ErrorToast(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
  });
  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");

    if (rawValue.length <= 10) {
      handleChange({ target: { name: e.target.name, value: rawValue } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-60">
      <div className="bg-gradient-to-br  from-[#A0E6E1] to-[#C3B4D3] w-[471px]  p-8 rounded-3xl shadow-lg relative text-gray-800 ">
        <div>
          <div className="flex  justify-between border-b border-[#FFFFFF] pb-5 ">
            <h2 className="text-[18px] font-[600] text-[#212121] mb-2 ">
              Enrollment
            </h2>
            <button
              onClick={onClose}
              className=" h-[36px] w-[36px] bg-white flex justify-center items-center rounded-full right-4 text-xl font-bold text-gray-700 hover:text-black"
            >
              <RxCross2 />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3 items-center my-4">
              <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-white shadow">
                <img
                  src={preview || UserPro}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <label className="text-[#000] font-[500] text-[16px] cursor-pointer">
                  Upload Picture
                  <input
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files[0];
                      setFieldValue("profilePic", file);
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {touched.profilePic && errors.profilePic && (
                  <div className="text-red-500 text-sm">
                    {errors.profilePic}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <GlobalInputs
                type="text"
                id={"name"}
                name={"name"}
                placeholder={"Enter Name"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name}
                touched={touched.name}
                max={50}
              />
              <GlobalInputs
                type="email"
                id={"email"}
                name={"email"}
                placeholder={"Enter Email"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                disabled
                max={250}
              />
              <PhoneInputs
                onChange={handlePhoneChange}
                onBlur={handleBlur}
                id="phone"
                name="phone"
                value={phoneFormater(values?.phone)}
                autoComplete="off"
                error={errors.phone}
                touched={touched.phone}
              />
            </div>
            <div className="mt-3">
              <GlobalButton
                children={"Update"}
                loading={loading}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
