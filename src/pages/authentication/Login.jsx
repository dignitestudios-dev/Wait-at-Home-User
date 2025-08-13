import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Bgauth, DesktopLoginLogo } from "../../assets/export";
import GlobalInputs from "../../components/global/GlobalInputs";
import { useFormik } from "formik";
import { loginValues } from "../../init/authentication/LoginValues";
import GlobalButton from "../../components/global/GlobalButton";
import { LoginSchema } from "../../schema/authentication/LoginSchema";
import { AppContext } from "../../context/AppContext";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { Auth } = useContext(AppContext);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginValues,
      validationSchema: LoginSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        const data = {
          email: values?.email,
          password: values?.password,
        };
        setLoading(true);
        try {
          const response = await axios.post("/auth/login", data);
          if (response.status === 200) {
            SuccessToast(response?.data?.message);
            Auth(response?.data);
            navigate("/app/home");
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
        <div className="flex justify-center mb-6">
          <img
            src={DesktopLoginLogo}
            alt="Logo"
            className="w-[260px] sm:w-[300px] lg:w-[380.68px] h-auto"
          />
        </div>

        <div className="text-center mb-6 mt-5">
          <h2 className="text-[26px] sm:text-[28px] lg:text-[32px] font-[600] text-[#1F1F1F]">
            Log In To Your Account
          </h2>
          <p className="text-[#565656] text-[13px] font-[400] mt-1">
            Welcome back! Enter your details to login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full">
            <GlobalInputs
              label="Email Address"
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              max={250}
            />
          </div>

          <div className="w-full">
            <GlobalInputs
              label="Password"
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
              max={50}
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-[#565656]">
              <input type="checkbox" className="accent-[#00AAAD]" />
              Remember me
            </label>
            <NavLink
              to="/auth/forgot-password"
              className="text-[#5E2E86] text-[13px] font-medium hover:underline"
            >
              Forgot password?
            </NavLink>
          </div>

          <GlobalButton children={"Login"} type="submit" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default Login;
