import React, { useState } from "react";
import { Bgauth, LockReset } from "../../assets/export";
import GlobalInputs from "../../components/global/GlobalInputs";
import { useFormik } from "formik";
import GlobalButton from "../../components/global/GlobalButton";
import { ResetValues } from "../../init/authentication/ResetValues";
import { ResetSchema } from "../../schema/authentication/ResetSchema";
import PasswordUpdated from "./PasswordUpdated";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: ResetValues,
      validationSchema: ResetSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        const data = {
          email: values?.password,
          password: values?.Cpassword,
        };
        setIsUpdate(true);
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
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
            <div className="flex justify-center mb-6">
              <img
                src={LockReset}
                alt="Logo"
                className="w-[106px] sm:w-[300px] lg:w-[89.9px] h-auto"
              />
            </div>

            <div className="text-center mb-6 mt-5">
              <h2 className="text-[26px] sm:text-[28px] lg:text-[32px] font-[600] text-[#1F1F1F]">
                Set a new Password
              </h2>
              <p className="text-[#565656] text-[13px] font-[400] mt-1">
                Create a Strong password to secure your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full">
                <GlobalInputs
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder={"Enter Password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                  max={50}
                />
              </div>
              <div className="w-full">
                <GlobalInputs
                  label="Confirm Password"
                  type="password"
                  name="Cpassword"
                  id="Cpassword"
                  placeholder={"Enter Confirm  Password"}
                  value={values.Cpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.Cpassword}
                  touched={touched.Cpassword}
                  max={50}
                />
              </div>

              <GlobalButton type="submit" children={"Set Password"} />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
