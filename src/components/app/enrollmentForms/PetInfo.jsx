import React, { useState } from "react";
import GlobalInputs from "../../global/GlobalInputs";
import { IoChevronDown } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import GlobalButton from "../../global/GlobalButton";

const PetInfo = ({
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  handleSubmit,
  passwordError,
  checked,
  setChecked,
  setFieldValue,
  loading,
}) => {
  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit}>
        <div className="px-1 pt-3 custom-scrollbar overflow-y-auto h-[450px] ">
          <GlobalInputs
            placeholder="Enter Pet’s Name"
            value={values.petName}
            type={"text"}
            name={"petName"}
            id={"petName"}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.petName}
            touched={touched.petName}
            max={50}
          />
          <div className="relative w-full mb-2">
            <select
              value={values.petType}
              onChange={handleChange}
              name="petType"
              id="petType"
              onBlur={handleBlur}
              className={`appearance-none w-full rounded-xl px-4 py-3 h-[49px] pr-10 text-[14px] bg-white text-[#616161] border placeholder:text-gray-400 outline-none focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6] transition ${
                errors.petType && touched.petType
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
              }`}
            >
              <option value="">Select Pet Type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
              <option value="other">Other</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#616161]">
              <IoChevronDown />
            </div>
            {errors.petType && touched && (
              <p className="text-red-500 text-[12px] mt-1 font-medium">
                {errors.petType}
              </p>
            )}
          </div>

          <GlobalInputs
            placeholder="Enter Pet Breed"
            value={values.petBreed}
            type={"text"}
            name={"petBreed"}
            id={"petBreed"}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.petBreed}
            touched={touched.petBreed}
            max={50}
          />
          <GlobalInputs
            placeholder="Enter Pet age"
            value={values.petAge}
            type={"text"}
            name={"petAge"}
            id={"petAge"}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.petAge}
            touched={touched.petAge}
          />
          <textarea
            name="petDiscription"
            placeholder="Enter Symptoms or Reasons for the visit"
            id="petDiscription"
            value={values.petDiscription}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={250}
            className={`bg-white w-full rounded-[20px] h-[113px] px-4 py-4 ${
              errors.petDiscription && touched.petDiscription
                ? "border-red-500 ring-1 ring-red-500"
                : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
            } `}
          ></textarea>
          {errors.petDiscription && touched.petDiscription && (
            <p className="text-red-500 text-[12px] mt-1 font-medium">
              {errors.petDiscription}
            </p>
          )}
          <div className="flex items-center gap-2 px-2 text-[14px] text-[#6B6B6B]">
            <label className="relative cursor-pointer">
              <input type="checkbox" className="peer hidden" />

              <div className="flex items-center gap-2 mt-3 text-[14px] text-[#6B6B6B]">
                <div
                  className={`w-[24px] h-[24px] rounded-[6px] border border-[#6B6B6B] cursor-pointer flex items-center justify-center transition-all ${
                    checked ? "bg-[#10C0B6] border-[#10C0B6]" : "bg-transparent"
                  }`}
                  onClick={() => {
                    setChecked(!checked);
                    setFieldValue("password", "");
                  }}
                >
                  {checked && <FaCheck size={14} color="#fff" />}
                </div>
                <span
                  onClick={() => {
                    setChecked(!checked);
                    setFieldValue("password", "");
                  }}
                  className="cursor-pointer"
                >
                  Save information for future use.
                </span>
              </div>
            </label>
          </div>
          {checked && (
            <div className="my-5">
              <GlobalInputs
                disabled={values.email}
                value={values.email}
                placeholder="Email"
              />
              <GlobalInputs
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id={"password"}
                name={"password"}
                placeholder="password"
                type="password"
                max={50}
                error={errors.password}
                touched={touched.password}
              />
              {passwordError && !values.password ? (
                <p className="text-red-500 text-[12px] mt-1 font-medium">
                  {passwordError}
                </p>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
        <div className="absolute bottom-2 w-full right-0 left-0 p-3 ">
          <GlobalButton loading={loading} type="submit" children={"Submit"} />
        </div>
      </form>
    </div>
  );
};

export default PetInfo;
