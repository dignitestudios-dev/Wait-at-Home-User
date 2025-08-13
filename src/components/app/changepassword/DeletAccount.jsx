import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Bgauth, DesktopLoginLogo } from "../../../assets/export";
import { IoIosArrowRoundBack } from "react-icons/io";
import GlobalInputs from "../../global/GlobalInputs";
import GlobalButton from "../../global/GlobalButton";
import * as Yup from "yup";
import DeleteSuccess from "./DeleteSuccess";

const DeleteAccountSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
const DeletAccount = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        password: "",
      },
      validationSchema: DeleteAccountSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        setIsUpdate(true);
        const data = {
          email: values?.email,
          password: values?.password,
        };
        // postData("/admin/login", false, null, data, processLogin);
      },
    });

  return (
    <>
      {isUpdate ? (
        <DeleteSuccess />
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
                Delete Account
              </h2>
              <p className="text-[#565656] text-[13px] font-[400] mt-1">
                You must enter current password in order to deactivate your
                account. Once your account is deactivate you can recover it
                within 7 days else it will be deleted permanently.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <GlobalButton children={"Deactivate Account"} type="submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletAccount;
