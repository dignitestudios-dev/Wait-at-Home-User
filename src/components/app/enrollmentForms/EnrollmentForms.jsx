import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import PetInfo from "./PetInfo";
import { RxCross2 } from "react-icons/rx";
import GlobalButton from "../../global/GlobalButton";

const EnrollmentModal = ({
  isOpen,
  onClose,
  handleBlur,
  handleChange,
  values,
  errors,
  touched,
  setStep,
  step,
  handleSubmit,
  setPasswordError,
  passwordError,
  checked,
  setChecked,
  setFieldValue,

  loading,
}) => {
  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");

    if (rawValue.length <= 10) {
      handleChange({ target: { name: e.target.name, value: rawValue } });
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gradient-to-br  from-[#A0E6E1] to-[#C3B4D3] w-[471px]  p-6 rounded-3xl shadow-lg relative text-gray-800 flex flex-col">
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
        <div className=" h-[600px]  px-2">
          <div className="flex-1 ">
            <div className="flex mt-8 mb-4 border-b rounded-sm border-gray-300">
              <button
                className={`flex-1  text-[18px] font-[600] pb-2  ${
                  step === 1
                    ? "text-black border-b-[3px] border-[#00AAAD]"
                    : "text-[#565656]"
                }`}
                onClick={() => setStep(1)}
              >
                Personal Info
              </button>
              <button
                className={`flex-1 pb-2 font-medium ${
                  step === 2
                    ? "text-black  border-b-[3px] border-[#00AAAD]"
                    : "text-gray-500"
                }`}
              >
                Pet Info
              </button>
            </div>

            {step === 1 ? (
              <PersonalInfo
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched}
                handlePhoneChange={handlePhoneChange}
              />
            ) : (
              <PetInfo
                loading={loading}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                setChecked={setChecked}
                checked={checked}
                setFieldValue={setFieldValue}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;
