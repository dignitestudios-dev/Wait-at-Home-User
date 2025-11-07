import React, { useState } from "react";
import { FieldArray, Form } from "formik";
import GlobalInputs from "../../global/GlobalInputs";
import { IoChevronDown } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import GlobalButton from "../../global/GlobalButton";
import { petBreeds } from "../../../static/StaticData";

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
  const [isOther, setIsOther] = useState({});

  return (
    <div className="mt-6">
      <Form>
        <div className="px-1 pt-3 custom-scrollbar overflow-y-auto h-[450px] ">
          <FieldArray
            name="pets"
            render={(arrayHelpers) => (
              <>
                {values.pets.map((pet, index) => {
                  const availableBreeds = petBreeds[pet.petType] || [];

                  const handleBreedChange = (e) => {
                    const value = e.target.value;
                    if (value === "Other") {
                      setIsOther((prev) => ({ ...prev, [index]: true }));
                      setFieldValue(`pets.${index}.petBreed`, "");
                    } else {
                      setIsOther((prev) => ({ ...prev, [index]: false }));
                      handleChange(e);
                    }
                  };

                  return (
                    <div key={index} className="mb-2 border-b pb-2">
                      {/* Pet Name */}
                      <GlobalInputs
                        placeholder="Pet’s Name"
                        value={pet.petName}
                        type="text"
                        name={`pets.${index}.petName`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.pets?.[index]?.petName}
                        touched={touched.pets?.[index]?.petName}
                        max={50}
                      />

                      {/* Pet Type */}
                      <div className="relative w-full mb-2">
                        <select
                          value={pet.petType}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue(`pets.${index}.petBreed`, "");
                            setIsOther((prev) => ({ ...prev, [index]: false }));
                          }}
                          name={`pets.${index}.petType`}
                          onBlur={handleBlur}
                          className={`appearance-none w-full rounded-xl px-4 py-3 h-[49px] pr-10 text-[14px] bg-white text-[#616161] border ${
                            errors.pets?.[index]?.petType &&
                            touched.pets?.[index]?.petType
                              ? "border-red-500 ring-1 ring-red-500"
                              : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
                          }`}
                        >
                          <option value="">Pet Type</option>
                          <option value="dog">Dog</option>
                          <option value="cat">Cat</option>
                          <option value="bird">Bird</option>
                          <option value="rabbit">Rabbit</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#616161]">
                          <IoChevronDown />
                        </div>
                        {errors.pets?.[index]?.petType &&
                          touched.pets?.[index]?.petType && (
                            <p className="text-red-500 text-[12px] mt-1 font-medium">
                              {errors.pets[index].petType}
                            </p>
                          )}
                      </div>

                      {/* Pet Breed - Short List + Other Input */}
                      {/* <div className="relative w-full mb-2">
                        <select
                          value={isOther[index] ? "Other" : pet.petBreed}
                          onChange={handleBreedChange}
                          name={`pets.${index}.petBreed`}
                          onBlur={handleBlur}
                          disabled={!pet.petType}
                          className={`appearance-none w-full rounded-xl px-4 py-3 h-[49px] pr-10 text-[14px] bg-white text-[#616161] border ${
                            errors.pets?.[index]?.petBreed &&
                            touched.pets?.[index]?.petBreed
                              ? "border-red-500 ring-1 ring-red-500"
                              : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
                          }`}
                        >
                          <option value="">
                            {pet.petType ? "Select Breed" : "Pet Type First"}
                          </option>
                          {availableBreeds.slice(0, 8).map((breed, i) => (
                            <option key={i} value={breed}>
                              {breed}
                            </option>
                          ))}
                          {availableBreeds.length > 0 && (
                            <option value="Other">Other</option>
                          )}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#616161]">
                          <IoChevronDown />
                        </div>
                        {errors.pets?.[index]?.petBreed &&
                          touched.pets?.[index]?.petBreed && (
                            <p className="text-red-500 text-[12px] mt-1 font-medium">
                              {errors.pets[index].petBreed}
                            </p>
                          )}
                      </div>

                      {isOther[index] && (
                        <input
                          type="text"
                          placeholder="Enter Breed"
                          value={pet.petBreed}
                          onChange={(e) =>
                            setFieldValue(
                              `pets.${index}.petBreed`,
                              e.target.value
                            )
                          }
                          className="w-full border rounded-lg p-2 mb-2"
                        />
                      )} */}
                      {/* Pet Breed - Text Input */}
                      <div className="relative w-full mb-2">
                        <input
                          type="text"
                          placeholder={
                            pet.petType ? "Enter Breed" : "Pet Type First"
                          }
                          value={pet.petBreed}
                          name={`pets.${index}.petBreed`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full rounded-xl px-4 py-3 h-[49px] text-[14px] bg-white text-[#616161] border ${
                            errors.pets?.[index]?.petBreed &&
                            touched.pets?.[index]?.petBreed
                              ? "border-red-500 ring-1 ring-red-500"
                              : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
                          }`}
                        />
                        {errors.pets?.[index]?.petBreed &&
                          touched.pets?.[index]?.petBreed && (
                            <p className="text-red-500 text-[12px] mt-1 font-medium">
                              {errors.pets[index].petBreed}
                            </p>
                          )}
                      </div>

                      {/* Pet Age */}
                      <GlobalInputs
                        placeholder="Age"
                        value={pet.petAge}
                        type="text"
                        name={`pets.${index}.petAge`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.pets?.[index]?.petAge}
                        touched={touched.pets?.[index]?.petAge}
                      />

                      {/* Pet Description */}
                      <textarea
                        name={`pets.${index}.petDiscription`}
                        placeholder="Reason for the visit"
                        value={pet.petDiscription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`bg-white w-full rounded-[20px] h-[113px] px-4 py-4 ${
                          errors.pets?.[index]?.petDiscription &&
                          touched.pets?.[index]?.petDiscription
                            ? "border-red-500 ring-1 ring-red-500"
                            : "border focus:border-[#10C0B6] focus:ring-2 focus:ring-[#10C0B6]"
                        }`}
                      />
                      {errors.pets?.[index]?.petDiscription &&
                        touched.pets?.[index]?.petDiscription && (
                          <p className="text-red-500 text-[12px] mt-1 font-medium">
                            {errors.pets[index].petDiscription}
                          </p>
                        )}

                      {/* Remove Button */}
                      {index > 0 && (
                        <button
                          type="button"
                          className="text-red-500 mt-2"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  );
                })}

                {/* Add More Button */}
                {/* <div className="flex justify-end">
                  <button
                    type="button"
                    className=" bg-[#10C0B6] text-white rounded-lg h-[34px] w-[120px]"
                    onClick={() =>
                      arrayHelpers.push({
                        petName: "",
                        petType: "",
                        petBreed: "",
                        petAge: "",
                        petDiscription: "",
                      })
                    }
                  >
                    + Add More
                  </button>
                </div> */}
              </>
            )}
          />

          {/* Save Info Checkbox */}
          <p className="text-[13px]  text-[#565656] mb-2  mx-2">
            You do not need to create an account/password to join the waiting
            list.
          </p>
          <div className="flex items-center mb-3  gap-2 px-2 text-[14px] text-[#6B6B6B] mt-4">
            <label className="relative cursor-pointer">
              <input type="checkbox" className="peer hidden" />
              <div className="flex items-center gap-2 text-[14px] text-[#6B6B6B]">
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
                  Create Account
                </span>
              </div>
            </label>
          </div>

          {/* Password Input if checked */}
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
                placeholder="Password *"
                type="password"
                max={50}
                error={errors.password}
                touched={touched.password}
              />
              {passwordError && !values.password && (
                <p className="text-red-500 text-[12px] mt-1 font-medium">
                  {passwordError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="absolute bottom-2 w-full right-0 left-0 p-3">
          <GlobalButton loading={loading} type="submit">
            Submit
          </GlobalButton>
        </div>
      </Form>
    </div>
  );
};

export default PetInfo;
