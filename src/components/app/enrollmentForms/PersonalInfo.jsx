import React from "react";
import GlobalInputs from "../../global/GlobalInputs";
import { IoAlertCircleOutline } from "react-icons/io5";
import GlobalButton from "../../global/GlobalButton";
import PhoneInputs from "../../global/PhoneInput";
import { phoneFormater } from "../../../lib/helpers";
import { MobileLogo } from "../../../assets/export";

const PersonalInfo = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  handleSubmit,
  handlePhoneChange,
}) => {
  return (
    <div className="mt-6 ">
      <form onSubmit={handleSubmit}>
        <div className="px-1">
          <GlobalInputs
            placeholder="Enter Your Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name={"name"}
            id={"name"}
            error={errors.name}
            touched={touched.name}
            max={50}
          />
          <GlobalInputs
            placeholder="Enter Your Email *"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            name={"email"}
            id={"email"}
            error={errors.email}
            touched={touched.email}
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
        <div className="flex items-start gap-2 mt-3 text-sm text-gray-600">
          <img
            src={MobileLogo}
            className="w-[32px] h-[32px] object-contain mt-1"
            alt=""
          />
          <span className="text-[13px] text-black">
            To ensure we have the right contact information for you, we will be
            sending a verification code to your phone and your email. Please
            double check that both are correct.
          </span>
        </div>
        <div className=" p-3 ">
          <GlobalButton type={"submit"} children={"Next"} />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
