import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { loginValues } from "../../../init/authentication/LoginValues";
import { LoginSchema } from "../../../schema/authentication/LoginSchema";
import {
  Bgauth,
  DesktopLoginLogo,
  Lock,
  Loginlogo,
} from "../../../assets/export";
import { IoIosArrowRoundBack } from "react-icons/io";
import GlobalInputs from "../../global/GlobalInputs";
import GlobalButton from "../../global/GlobalButton";
import PasswordUpdated from "../../../pages/authentication/PasswordUpdated";
import { ChangepassSchema } from "../../../schema/app/ChangepassValuesSchema";
import { ChangepassValues } from "../../../init/app/ChangepassValues";
import axios from "../../../axios";
import { ErrorToast, SuccessToast } from "../../global/Toaster";
const ChangePassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: ChangepassValues,
      validationSchema: ChangepassSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        const data = {
          currentPassword: values?.currentpassword,
          newPassword: values?.newpassword,
        };
        setLoading(true);
        try {
          const response = await axios.post("/auth/change-password", data);
          if (response?.status === 200) {
            SuccessToast(response?.data?.message);
            navigate("/app/home");
            setIsUpdate(true);
          }
        } catch (error) {
          ErrorToast(error?.response?.data?.message);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <>
      {isUpdate ? (
        <PasswordUpdated />
      ) : (
        <div
          className="min-h-screen rounded-[45px] bg-cover bg-center w-full
    flex items-center justify-center lg:justify-end px-4 p-10"
          style={{ backgroundImage: `url(${Bgauth})` }}
        >
          <div
            className="bg-white  backdrop-blur-sm shadow-2xl rounded-[45px]
        w-full max-w-[599px] h-[772px] p-6 lg:p-20
        mx-auto lg:mx-0
        flex flex-col justify-center"
          >
            <div
              onClick={() => navigate(-1)}
              className="bg-[#00AAAD] rounded-[14px] cursor-pointer h-[48px] w-[48px] flex items-center justify-center p-2 absolute top-10 left-6 "
            >
              <IoIosArrowRoundBack color="white" size={50} />
            </div>
            <div className="flex justify-center mb-6">
              <img
                src={DesktopLoginLogo}
                alt="Logo"
                className="w-[260px] sm:w-[300px] lg:w-[380.68px] h-auto"
              />
            </div>

            <div className="text-center mb-6 mt-5">
              <h2 className="text-[26px] sm:text-[28px] lg:text-[20px] font-[600] text-[#1F1F1F]">
                Change password
              </h2>
              <p className="text-[#565656] text-[13px] font-[400] mt-1">
                You must enter current password in order to change your
                password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full">
                <GlobalInputs
                  label="Current password"
                  type="password"
                  name="currentpassword"
                  id="currentpassword"
                  value={values.currentpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.currentpassword}
                  touched={touched.currentpassword}
                  max={50}
                />
              </div>
              <div className="w-full">
                <GlobalInputs
                  label="New password"
                  type="password"
                  name="newpassword"
                  id="newpassword"
                  value={values.newpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.newpassword}
                  touched={touched.newpassword}
                  max={50}
                />
              </div>
              <div className="w-full">
                <GlobalInputs
                  label="Confirm password"
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  value={values.confirmpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.confirmpassword}
                  touched={touched.confirmpassword}
                  max={50}
                />
              </div>

              <GlobalButton
                loading={loading}
                children={"Change password"}
                type="submit"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
