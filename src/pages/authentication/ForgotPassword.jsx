import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Bgauth, DesktopLoginLogo, Lock } from "../../assets/export";
import GlobalInputs from "../../components/global/GlobalInputs";
import { useFormik } from "formik";
import { loginValues } from "../../init/authentication/LoginValues";
import GlobalButton from "../../components/global/GlobalButton";
import { LoginSchema } from "../../schema/authentication/LoginSchema";
import { IoIosArrowRoundBack } from "react-icons/io";
import * as Yup from "yup";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
      }),
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        const data = {
          email: values?.email,
          password: values?.password,
        };
        setLoading(true);
        try {
          const response = await axios.post("/auth/forgot-password", data);
          if (response?.status === 200) {
            SuccessToast(response?.data?.message);
            navigate("/auth/otp-forgot");
            sessionStorage.setItem("email", values?.email);
          }
        } catch (error) {
          ErrorToast(error?.response?.data?.message);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
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
            src={Lock}
            alt="Logo"
            className="w-[90px] sm:w-[300px] lg:w-[90px] h-[90px]"
          />
        </div>

        <div className="text-center mb-6 mt-5">
          <h2 className="text-[26px] sm:text-[28px] lg:text-[32px] font-[600] text-[#1F1F1F]">
            Forgot your Password?
          </h2>
          <p className="text-[#565656] text-[14px] font-[400] mt-1">
            Please enter your email to get started on resetting your password:
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full">
            <GlobalInputs
              label="Email Address"
              type="email"
              name="email"
              id="email"
              placeholder={"Enter Email"}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              max={250}
            />
          </div>

          <GlobalButton loading={loading} children={"Reset Password"} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
