import React from "react";
import GlobalInputs from "../../global/GlobalInputs";
import { IoAlertCircleOutline } from "react-icons/io5";
import GlobalButton from "../../global/GlobalButton";
import PhoneInputs from "../../global/PhoneInput";
import { phoneFormater } from "../../../lib/helpers";

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
    <div className="mt-6">
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
            placeholder="Enter Your Email"
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
        <div className=" p-3 absolute bottom-0 w-full right-0 left-0 ">
          <GlobalButton type={"submit"} children={"Next"} />
        </div>
      </form>

      <div className="flex items-start text-sm mt-2 text-gray-600">
        <span className="text-xl mr-2">
          <IoAlertCircleOutline size={24} className="mt-1 min-w-[24px]" />
        </span>
        <span>
          <strong className="text-black text-[13px] font-[600] ">
            Heads Up!
          </strong>
          <p className="text-[13px]  text-[#565656] ">
            Before submitting, double-check your email and phone number, we'll
            be sending a verification to both. Make sure they’re correct so you
            don’t miss it!
          </p>
        </span>
      </div>
    </div>
  );
};

export default PersonalInfo;
